# SimToolReal · English Speaker Notes

Suggested duration: 32–37 minutes including looping GIFs, plus discussion. Slides 1–24 are the main talk. Slide 25 is the reference backup. Use Right / Space for step reveals, A to reveal a whole page, and F for fullscreen. Experiment GIFs loop automatically, are silent and preserve the original playback speed.

## 1. SimToolReal

The cover GIF loops through real robot experiments with a brush, hammer, marker and spatula. Use it to establish the physical setting before introducing the central question: how can one dexterous controller transfer across unfamiliar tools and goal trajectories? SimToolReal trains such a controller on simple synthetic tools in simulation. At deployment, human demonstrations provide object motion goals, while the robot decides how its own hand and arm should realize them. We will ask how to teach tool use, then formulate a pose-reaching problem and study its simulation-trained recurrent policy. Only after seeing simulation behavior will we introduce the real-world perception pipeline. Several looping experiment GIFs illustrate transfer before a short quantitative summary and discussion. The paper is listed in the RSS 2026 proceedings.

Source: Kedia et al. · SimToolReal · arXiv:2602.16863v2

## 2. How would you teach a robot to use tools?

Begin with the open question before revealing any choices. Give the audience time to suggest their own route. Reveal robot imitation, human retargeting and simulation learning as possible answers rather than an exhaustive or mutually exclusive taxonomy. A diffusion policy or VLA can use imitation learning. Ask what data each route needs, and how it handles grasping thin tools, in-hand rotation and forceful contacts. Then narrow the discussion to the demonstration bottleneck.

Source: Presenter brainstorm · Motivated by paper §I–II

## 3. What makes demonstration-based tool use difficult?

The previous page leaves multiple routes open. Here explain the particular bottlenecks that motivate this paper. Robot action demonstrations directly match the robot but are costly to collect well in dexterous contact tasks. Human video is convenient, yet transferring finger motion does not guarantee feasible contacts. These limitations do not prove imitation learning or VLAs cannot solve the tasks. SimToolReal includes neither a strong learned IL nor a VLA baseline. Its alternative is to keep object-level guidance and learn the motor strategy in simulation.

Source: Paper §I–II · Motivation, not a general failure claim about IL

## 4. Tool use as a sequence of pose-reaching problems

This is the conceptual pivot. The human provides a sequence of rigid-tool configurations. A goal-conditioned controller learns how to move the tool between configurations using this robot's arm and hand. It is related to functional or object-centric retargeting, but the controller is trained in advance on randomized primitives rather than trained for each demonstration. The arrow from goals to policy denotes conditioning, not policy fine-tuning.

Source: Paper §III-A · Presenter schematic

## 5. A 6D pose specifies position and orientation

A rigid object's pose has three translational and three rotational degrees of freedom. It need not be encoded as six Euler-angle coordinates; the paper uses keypoint-based features and distances. Reveal lift, reorientation and swing in order. This schematic is a task interface, not a measured demonstration. At runtime the policy receives the current goal. The goal sequence is spatial and event-driven, so the robot does not have to reproduce the human's timing.

Source: Paper §III-A · Illustrative pose sequence, not experimental data

## 6. Training pipeline: learn pose reaching through interaction

This diagram is entirely in simulation. Randomized tool geometry, density, initial state and pose goals define the environments. The actor receives restricted observations, with noise and delay, and produces arm-hand actions. The simulator returns the next state and reward. Reveal the asymmetric critic: it sees exact simulator state and extra progress features during training only. SAPG, a PPO-family algorithm, uses a population for exploration and their collected experience to update a leader policy. The result is one reusable actor, not a task-specific policy trained after seeing a test demonstration. IsaacGym runs 24,576 parallel environments in the reported setup.

Source: Paper §III-B · Appendix C · Simplified simulation-only pipeline

## 7. SAPG splits exploration and aggregates experience

SAPG stands for Split and Aggregate Policy Gradients. First reveal Split. The simulator environments are partitioned across a leader and multiple follower policies. Followers use different entropy regularization strengths, so the population covers different exploration–exploitation behaviors. Each policy collects its own dataset and followers still update from their own data with the usual PPO objective. Then reveal Aggregate. The leader combines its own on-policy dataset with sampled follower experience. Because the follower trajectories came from different policies, SAPG uses importance weighting in the off-policy part of the leader update. The final deployed policy is the leader. This is a simplified leader–follower schematic: pi 1 through pi M denotes a general population size rather than the exact number of boxes drawn. The main reason to use SAPG here is the exploration challenge created by high-dimensional dexterous actions and massively parallel simulation. Avoid describing SAPG as a new robot architecture or a replacement for actor–critic learning. It changes population-based data collection and experience aggregation around PPO-style optimization. Original method: Singla et al., Split and Aggregate Policy Gradients, ICML 2024, https://sapg-rl.github.io/resources/2024_icml_sapg.pdf. SimToolReal configuration: https://github.com/tylerlum/simtoolreal/blob/main/isaacsimenvs/cfg/train/SimToolRealSAPG.yaml

Source: Singla et al. · Split and Aggregate Policy Gradients · ICML 2024 · SimToolReal Appendix C

## 8. SAPG learns more effectively than PPO in this setting

Read this as the evidence page for the previous SAPG mechanism. The clean SAPG-versus-PPO comparison uses the same asymmetric critic in both runs. The main change is the exploration and experience aggregation scheme: PPO uses a single policy's on-policy data, while SAPG distributes exploration across policies and uses importance-weighted follower experience in the leader update. Across the nine-billion-step ablation, SAPG keeps improving while PPO remains at a much lower reward. Do not claim that this isolates every training choice. The third curve removes the asymmetric critic while retaining SAPG and also performs poorly, so the paper supports the combined training recipe rather than proving that SAPG alone explains the full gain. The curves report simulation episode reward averaged over five seeds. They do not measure real-world task success or sample efficiency against every modern RL baseline.

Source: Simulation · Paper Fig. 8 · §IV-E

## 9. Procedural tools cover shape and mass variation

The authors do not train a semantic module to discover that all tools share a purpose. They choose a handle–head structural family and generate simple geometry with varied size and density. The policy receives a coarse grasp box, not a detailed mesh or an explicit estimate of mass and inertia. LSTM history helps infer unobserved properties through interaction. The small boxes shown here are schematic, not the actual distribution of sampled assets.

Source: Paper §III-B · Procedural Asset Generation appendix · Presenter schematic

## 10. RL training signal: how each reward term is constructed

Use “reward” rather than “loss” for the three terms on this page. Start with smoothness: the method subtracts separate L1 norms of current joint velocities for the seven arm joints and twenty-two hand joints, weighted by lambda arm and lambda hand. Then reveal grasp shaping. The approach term is lambda approach times improvement in mean fingertip-to-object distance relative to the best value seen in the episode. The lift term rewards object height above its initial value and adds a one-time bonus after crossing the lift threshold. Multiplication by one minus I grasped disables lifting reward after the first successful lift. Finally reveal goal reaching. The method stores the smallest keypoint distance d star achieved for the current goal and rewards only further improvement, which prevents repeated reward for remaining statically near a target. Crossing epsilon adds a success bonus and resamples the next goal. Distance is the maximum Euclidean error over four fixed-scale object-frame keypoints, using 14 by 3 by 3 centimeter scales. This makes translation and rotation enter one metric and puts more sensitivity on pitch and yaw than roll along the tool's long axis. The outer I grasped activates goal reward only after lifting. Distinguish these environment rewards from the SAPG/PPO actor–critic optimization loss.

Source: Paper §III-B · Appendix A, Eqs. 3–9 · Table I

## 11. LSTM memory carries interaction history across steps

Read the unrolled network from left to right. At time t, the same LSTM receives the current feature vector x t, the previous hidden state h t minus 1 and the previous cell state c t minus 1. The feature vector already bundles the deployable object-centric interface introduced in the simulation pipeline: robot proprioception and the previous joint target, plus tool orientation, palm-relative keypoints, goal-keypoint errors and grasp-box dimensions. It excludes the detailed mesh, explicit mass and inertia, and privileged object velocity. The LSTM outputs updated states h t and c t. The action MLP reads h t to produce the current 29-dimensional action. The cell state is the internal memory channel. In the standard LSTM update shown here, the forget gate f t decides how much of c t minus 1 to retain, while the input gate i t decides how much candidate memory c tilde t to write. The hidden state is the currently exposed representation. The output gate o t selects which information from the updated cell state reaches h t. Both states have 1,024 dimensions in this policy. The diagram does not mean that the model receives a literal stack of past frames or outputs historical actions. History affects the current decision through the recurrent states, while the previous joint target also enters the observation explicitly. The authors motivate recurrence as a way to infer latent physical and geometric properties through interaction. This is an architectural rationale, not evidence that individual hidden units encode an identifiable mass estimate. The unrolled diagram represents one shared recurrent policy, not three separately trained policies. The gate equations are the standard LSTM mechanism and are included for explanation; the paper does not claim gate-level novelty. The MLP hidden widths are 1,024, 1,024, 512 and 512 before 29 action outputs. The official configuration uses one LSTM layer, layer normalization and ELU in the MLP. Configuration snapshot: https://github.com/tylerlum/simtoolreal/blob/313d5aea1f507c6cfe097b672b62945d7b0bbff5/isaacgymenvs/cfg/train/SimToolRealLSTMAsymmetricPPO.yaml

Source: Paper §III-B · Table I · Standard recurrent-state schematic

## 12. The action head controls the arm and hand differently

The network output is not a Cartesian tool displacement or a direct torque command. After clipping to minus one through one, the seven arm components are incremental changes from previous joint targets, with the reported scale 0.025. The 22 hand components map to absolute joint limits. Both streams use exponential moving average smoothing with alpha 0.1. The exact clipping order differs: arm targets are clipped before smoothing, while hand targets are clipped after smoothing. The important distinction is online memory update versus weight update. Hidden and cell states change as observations arrive, but policy parameters do not adapt at deployment. This permits feedback control without task-specific training.

Source: Paper Appendix C.2 · Eqs. 10–11 · Table I

## 13. Simulation: reaching diverse tool poses

The training GIF loops automatically. Direct attention to the changing relationship between fingers and object as the policy reaches targets. The green object is a target visualization, not a second physical object. This clip illustrates what the training environment looks like. It does not independently quantify training efficiency or prove generalization.

Source: Official project video · training.gif converted from training.mp4 · Paper §III-B

## 14. Simulation exposes the state. Reality requires estimation.

Use the simulation video as the transition. The simulator exposes exact state, although the actor was deliberately trained with corrupted observations and the critic had the clean state. At deployment, neither the current pose nor a new tool's geometry comes from a simulator. They must be estimated. Random goals also need to become a useful task sequence. A human demonstration specifies that sequence. This motivates the real-world setup and tracking modules on the next page. Zero-shot means transferring the policy without target-tool or target-task training, not removing demonstrations, calibration or perception.

Source: Paper §III-B–C · The actor trains with noise and delay despite simulator ground truth

## 15. Real deployment supplies the same policy interface

This is the first full real-world deployment pipeline. During setup, a human RGB-D demonstration supplies the tool and desired motion. User-prompted SAM 2 segmentation and SAM 3D, using captured depth, recover a metric mesh and grasp box. FoundationPose tracks the mesh through the video to extract goals. During online execution, a fresh RGB-D stream and that mesh supply the live pose. The fixed actor receives this pose, proprioception, the grasp box and the current goal. Its actions close the physical loop. The mesh belongs to perception and is not fed directly into the actor. No policy training takes place in this pipeline. The grasp box and mesh are setup outputs reused throughout an episode.

Source: Paper §III-C · Appendix E · Simplified redraw of real deployment

## 16. The robot advances goals only after reaching them

The setup is semi-automated: user point prompts identify the tool and handle/head, SAM 3D uses captured depth for metric scale, and FoundationPose extracts the demonstrated trajectory and tracks the live tool. Separate the three rates explicitly. Human trajectory processing downsamples a 30 Hz video trajectory to 3 Hz waypoints and trims its stationary pre-grasp portion. The live pose tracker updates at 30 Hz. Robot control runs at 60 Hz. The active goal changes only after the pose error falls below the threshold, not every one-third of a second. The robot may therefore take longer to execute a difficult transition than the person did. Zero-shot means no target-tool or target-trajectory policy training. A demonstration, geometry setup and live sensing are still required.

Source: Paper §III-C · Table I · Goal Pose Sequence appendix · Presenter schematic

## 17. The closed loop follows unseen tool trajectories

The looping project GIF places the human demonstration and extracted goal poses alongside real robot execution. Use it to connect the two branches of the pipeline. The robot policy does not update its weights on this new trajectory. Goal progression is event-driven, as described on the preceding slide. Treat the rendered goal display as an explanatory visualization, not additional evidence from a digital-twin experiment.

Source: Official project video · inference.gif converted from inference.mp4 · Paper §III-C

## 18. Brush and hammer: reorientation before interaction

The brush and hammer GIFs loop side by side so the audience can compare finger motion without manual playback. Ask what the recurrent controller must do beyond moving the wrist. Both require acquiring a tool and changing its orientation relative to the hand. These author-provided category montages show real behavior at original speed. They are illustrative selections rather than random evaluation samples. Do not infer impact force or aggregate reliability from the montage.

Source: Real robot · Looping GIFs converted from official category videos · 1× speed · Qualitative examples

## 19. Marker and eraser: tool motion along a surface

Compare the geometry and contact demands in the two clips. A marker is thin and requires tip positioning, whereas an eraser presents a larger contact region. The same actor handles both through the pose and grasp-region interface. The human supplies the demonstrated trajectory and perception supplies the tool state. The policy has no explicit representation of ink or erasing quality. Visible writing and wiping illustrate behavior but do not turn the benchmark pose-progress metric into a functional-success measure.

Source: Real robot · Looping GIFs converted from official category videos · 1× speed · Qualitative examples

## 20. Spatula and screwdriver: larger orientation changes

These clips emphasize orientation control, especially large flips and continuous rotations. Ask the audience to watch whether the fingers change contact while the tool turns. The benchmark includes serving or flipping with spatulas and free-space spinning with screwdrivers. It does not evaluate fastening a screw. The screwdriver is also a challenging case for visual tracking because symmetry can make orientation ambiguous. These examples motivate both the compact pose interface and its limitations for force-sensitive functional tasks.

Source: Real robot · Looping GIFs converted from official category videos · Screwdriver task is free-space spinning

## 21. Real-world transfer across six tool categories

DexToolBench evaluates six categories with two instances and two trajectories each, using five rollouts per variation. This chart recomputes category means from all 120 published rollout values. The evaluation threshold is 2 cm maximum pose-keypoint error, combining translation and rotation. Erasers need less in-hand rotation, while screwdrivers require reorientation and spinning. The overall mean is 79.3% trajectory progress, not 79.3% completed tasks. Screwdriver trials involve free-space spinning rather than screw insertion or tightening. Source rounding may affect the last decimal.

Source: Real robot · Presenter aggregation of Table II · 20 trials per category

## 22. Recovery illustrates feedback, with clear limits

The recovery GIF loops automatically and brings the emphasis back from average performance to the role of feedback. The authors observe regrasp attempts even though training resets after drops. Keep the claim conditional: useful state feedback and a reachable object remain necessary. The policy does not explicitly plan around scene obstacles or optimize functional contact forces. Rigid tools and a fixed goal sequence also limit the scope. These qualifications motivate the three research inspirations on the next page. A selected recovery clip is not a systematic robustness evaluation.

Source: Looping GIF converted from the official recovery video · Paper §IV-A and §V · Qualitative behavior

## 23. Three research directions suggested by the method

Discuss the user's three inspirations together. First, structured simulation and reusable motor controllers may complement scaling large action models. SimToolReal establishes transfer in a structured setup, not autonomous online skill acquisition in the wild. It already relies on vision foundation models. Second, the deeper idea is finding sufficient task interfaces. Rigid SE(3) poses will not capture articulated state, deformation, force or all scene constraints. Third, lightweight VLMs could reduce manual semantic prompting or help choose and revise subgoals. Replacing a tracker directly would need evaluation of metric pose error, latency and failure behavior. A first controlled experiment could keep the actor fixed while comparing manual prompts with VLM region proposals, measuring setup effort and end-to-end functional completion.

Source: Presenter discussion · Grounded in the method and acknowledged limitations

## 24. Structured simulation as a route to reusable robot skills

Close with one presenter reflection rather than another method recap. SimToolReal suggests a complementary route to broadly useful robot skills: use structured simulation to learn reusable physical competence, then let perception and object-level goals adapt that competence to new tools and trajectories. This differs from learning every task end to end from robot action demonstrations. Keep the claim forward-looking. The paper demonstrates a transferable motor controller inside a carefully designed interface. It does not demonstrate autonomous discovery of new tasks, goals or rewards in the wild.

Source: Presenter reflection · Motivated by the paper’s modular skill interface

## 25. References, videos and source material

Paper figures and project videos retain their original authorship. Custom diagrams are explanatory schematics. The SAPG page simplifies the leader–follower data flow from Singla et al., ICML 2024. Real-world aggregate charts derive from the published Table II data, provided in CSV form alongside this deck. The discussion section explicitly labels untested extensions. The package also contains English speaker notes and a detailed Chinese narrative assessment.

Source: Sources and attribution