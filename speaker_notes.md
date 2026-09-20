# SimToolReal · English Speaker Notes

Suggested duration: 30–35 minutes including videos, plus discussion. Slides 1–23 are the main talk. Slides 24–25 are backup. Use Right / Space for step reveals, A to reveal a whole page, F for fullscreen, and V for video play/pause. On paired video pages, click the desired tool button first; V then controls that selected video. Clips are silent and run at original speed.

## 1. SimToolReal

The central question is how to reuse a dexterous controller across unfamiliar tools and goal trajectories. SimToolReal trains such a controller on simple synthetic tools in simulation. At deployment, human demonstrations provide object motion goals, while the robot decides how its own hand and arm should realize them. We will ask how to teach tool use, then formulate a pose-reaching problem and study its simulation-trained recurrent policy. Only after seeing simulation behavior will we introduce the real-world perception pipeline. Several tool videos illustrate transfer before a short quantitative summary and discussion. The paper is listed in the RSS 2026 proceedings.

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

## 7. Procedural tools cover shape and mass variation

The authors do not train a semantic module to discover that all tools share a purpose. They choose a handle–head structural family and generate simple geometry with varied size and density. The policy receives a coarse grasp box, not a detailed mesh or an explicit estimate of mass and inertia. LSTM history helps infer unobserved properties through interaction. The small boxes shown here are schematic, not the actual distribution of sampled assets.

Source: Paper §III-B · Procedural Asset Generation appendix · Presenter schematic

## 8. RL training signal: how each reward term is constructed

Use “reward” rather than “loss” for the three terms on this page. Start with smoothness: the method subtracts separate L1 norms of current joint velocities for the seven arm joints and twenty-two hand joints, weighted by lambda arm and lambda hand. Then reveal grasp shaping. The approach term is lambda approach times improvement in mean fingertip-to-object distance relative to the best value seen in the episode. The lift term rewards object height above its initial value and adds a one-time bonus after crossing the lift threshold. Multiplication by one minus I grasped disables lifting reward after the first successful lift. Finally reveal goal reaching. The method stores the smallest keypoint distance d star achieved for the current goal and rewards only further improvement, which prevents repeated reward for remaining statically near a target. Crossing epsilon adds a success bonus and resamples the next goal. Distance is the maximum Euclidean error over four fixed-scale object-frame keypoints, using 14 by 3 by 3 centimeter scales. This makes translation and rotation enter one metric and puts more sensitivity on pitch and yaw than roll along the tool's long axis. The outer I grasped activates goal reward only after lifting. Distinguish these environment rewards from the SAPG/PPO actor–critic optimization loss.

Source: Paper §III-B · Appendix A, Eqs. 3–9 · Table I

## 9. The policy observes a compact, object-centric state

Unpack the high-level notation. Proprioception includes 29 joint positions, 29 joint velocities, previous joint targets, the palm position and orientation, and five fingertip positions relative to the palm. Tool features include its orientation, four palm-relative keypoints, and four object-to-goal keypoint differences. Instance-specific grasp-box dimensions define the observation keypoints. The reward uses fixed-scale keypoints instead. The current goal is the target for this step, rather than the full trajectory. The actor does not receive a detailed mesh, explicit mass or inertia, or privileged object velocities. In simulation these inputs derive from simulator state with targeted corruption.

Source: Paper §III-B · Appendix C.3 · Feature notation is a presenter summary

## 10. LSTM memory carries interaction history across steps

Read the network from left to right in time. At every step, the same LSTM consumes the current feature vector and its previous hidden and cell states. It produces a new memory state and an action through an MLP head. The LSTM has 1,024 units, and the MLP hidden widths are 1,024, 1,024, 512 and 512 before 29 action outputs. The previous joint target is also an explicit input feature. The authors motivate recurrence as a way to infer latent physical and geometric properties through interaction. This is an architectural rationale, not evidence that individual hidden units encode an identifiable mass estimate. The unrolled diagram uses standard LSTM state notation for explanation. It does not represent three separately trained policies. No gate-level novelty is claimed. The official configuration confirms one LSTM layer before the MLP, enables layer normalization, and uses ELU in the MLP. Configuration snapshot: https://github.com/tylerlum/simtoolreal/blob/313d5aea1f507c6cfe097b672b62945d7b0bbff5/isaacgymenvs/cfg/train/SimToolRealLSTMAsymmetricPPO.yaml

Source: Paper §III-B · Table I · Standard recurrent-state schematic

## 11. The action head controls the arm and hand differently

The network output is not a Cartesian tool displacement or a direct torque command. After clipping to minus one through one, the seven arm components are incremental changes from previous joint targets, with the reported scale 0.025. The 22 hand components map to absolute joint limits. Both streams use exponential moving average smoothing with alpha 0.1. The exact clipping order differs: arm targets are clipped before smoothing, while hand targets are clipped after smoothing. The important distinction is online memory update versus weight update. Hidden and cell states change as observations arrive, but policy parameters do not adapt at deployment. This permits feedback control without task-specific training.

Source: Paper Appendix C.2 · Eqs. 10–11 · Table I

## 12. Simulation: reaching diverse tool poses

Play the training excerpt. Direct attention to the changing relationship between fingers and object as the policy reaches targets. The green object is a target visualization, not a second physical object. This clip illustrates what the training environment looks like. It does not independently quantify training efficiency or prove generalization.

Source: Official project video · training.mp4 · Paper §III-B

## 13. Simulation exposes the state. Reality requires estimation.

Use the simulation video as the transition. The simulator exposes exact state, although the actor was deliberately trained with corrupted observations and the critic had the clean state. At deployment, neither the current pose nor a new tool's geometry comes from a simulator. They must be estimated. Random goals also need to become a useful task sequence. A human demonstration specifies that sequence. This motivates the real-world setup and tracking modules on the next page. Zero-shot means transferring the policy without target-tool or target-task training, not removing demonstrations, calibration or perception.

Source: Paper §III-B–C · The actor trains with noise and delay despite simulator ground truth

## 14. Real deployment supplies the same policy interface

This is the first full real-world deployment pipeline. During setup, a human RGB-D demonstration supplies the tool and desired motion. User-prompted SAM 2 segmentation and SAM 3D, using captured depth, recover a metric mesh and grasp box. FoundationPose tracks the mesh through the video to extract goals. During online execution, a fresh RGB-D stream and that mesh supply the live pose. The fixed actor receives this pose, proprioception, the grasp box and the current goal. Its actions close the physical loop. The mesh belongs to perception and is not fed directly into the actor. No policy training takes place in this pipeline. The grasp box and mesh are setup outputs reused throughout an episode.

Source: Paper §III-C · Appendix E · Simplified redraw of real deployment

## 15. The robot advances goals only after reaching them

The setup is semi-automated: user point prompts identify the tool and handle/head, SAM 3D uses captured depth for metric scale, and FoundationPose extracts the demonstrated trajectory and tracks the live tool. Separate the three rates explicitly. Human trajectory processing downsamples a 30 Hz video trajectory to 3 Hz waypoints and trims its stationary pre-grasp portion. The live pose tracker updates at 30 Hz. Robot control runs at 60 Hz. The active goal changes only after the pose error falls below the threshold, not every one-third of a second. The robot may therefore take longer to execute a difficult transition than the person did. Zero-shot means no target-tool or target-trajectory policy training. A demonstration, geometry setup and live sensing are still required.

Source: Paper §III-C · Table I · Goal Pose Sequence appendix · Presenter schematic

## 16. The closed loop follows unseen tool trajectories

The project video places the human demonstration and extracted goal poses alongside real robot execution. Use it to connect the two branches of the pipeline. The robot policy does not update its weights on this new trajectory. Goal progression is event-driven, as described on the preceding slide. Treat the rendered goal display as an explanatory visualization, not additional evidence from a digital-twin experiment.

Source: Official project video · inference.mp4 · Paper §III-C

## 17. Brush and hammer: reorientation before interaction

Play the brush and hammer clips separately so the audience can track the fingers. Ask what the recurrent controller must do beyond moving the wrist. Both require acquiring a tool and changing its orientation relative to the hand. These author-provided category montages show real behavior at original speed. They are illustrative selections rather than random evaluation samples. Do not infer impact force or aggregate reliability from the montage. Click a tool's play button to choose it. V then controls the most recently selected video.

Source: Real robot · Official project category videos · 1× speed · Qualitative examples

## 18. Marker and eraser: tool motion along a surface

Compare the geometry and contact demands in the two clips. A marker is thin and requires tip positioning, whereas an eraser presents a larger contact region. The same actor handles both through the pose and grasp-region interface. The human supplies the demonstrated trajectory and perception supplies the tool state. The policy has no explicit representation of ink or erasing quality. Visible writing and wiping illustrate behavior but do not turn the benchmark pose-progress metric into a functional-success measure.

Source: Real robot · Official project category videos · 1× speed · Qualitative examples

## 19. Spatula and screwdriver: larger orientation changes

These clips emphasize orientation control, especially large flips and continuous rotations. Ask the audience to watch whether the fingers change contact while the tool turns. The benchmark includes serving or flipping with spatulas and free-space spinning with screwdrivers. It does not evaluate fastening a screw. The screwdriver is also a challenging case for visual tracking because symmetry can make orientation ambiguous. These examples motivate both the compact pose interface and its limitations for force-sensitive functional tasks.

Source: Real robot · Official project category videos · Screwdriver task is free-space spinning

## 20. Real-world transfer across six tool categories

DexToolBench evaluates six categories with two instances and two trajectories each, using five rollouts per variation. This chart recomputes category means from all 120 published rollout values. The evaluation threshold is 2 cm maximum pose-keypoint error, combining translation and rotation. Erasers need less in-hand rotation, while screwdrivers require reorientation and spinning. The overall mean is 79.3% trajectory progress, not 79.3% completed tasks. Screwdriver trials involve free-space spinning rather than screw insertion or tightening. Source rounding may affect the last decimal.

Source: Real robot · Presenter aggregation of Table II · 20 trials per category

## 21. Recovery illustrates feedback, with clear limits

This clip brings the emphasis back from average performance to the role of feedback. The authors observe regrasp attempts even though training resets after drops. Keep the claim conditional: useful state feedback and a reachable object remain necessary. The policy does not explicitly plan around scene obstacles or optimize functional contact forces. Rigid tools and a fixed goal sequence also limit the scope. These qualifications motivate the three research inspirations on the next page. A selected recovery clip is not a systematic robustness evaluation.

Source: Official project recovery video · Paper §IV-A and §V · Qualitative behavior

## 22. Three research directions suggested by the method

Discuss the user's three inspirations together. First, structured simulation and reusable motor controllers may complement scaling large action models. SimToolReal establishes transfer in a structured setup, not autonomous online skill acquisition in the wild. It already relies on vision foundation models. Second, the deeper idea is finding sufficient task interfaces. Rigid SE(3) poses will not capture articulated state, deformation, force or all scene constraints. Third, lightweight VLMs could reduce manual semantic prompting or help choose and revise subgoals. Replacing a tracker directly would need evaluation of metric pose error, latency and failure behavior. A first controlled experiment could keep the actor fixed while comparing manual prompts with VLM region proposals, measuring setup effort and end-to-end functional completion.

Source: Presenter discussion · Grounded in the method and acknowledged limitations

## 23. A reusable motor skill needs a well-chosen task interface

Close by returning to the initial question about how robots can acquire tool-use skills. This paper demonstrates an effective division of labor: human object-motion specification, geometric perception and a simulation-trained motor controller. The most general lesson is about interface design, not a claim that all robotics problems reduce to pose tracking. Invite discussion on how to identify sufficient state and objectives for broader interactions.

Source: Paper contributions and presenter synthesis

## 24. Ablations identify important RL ingredients

The full policy uses SAPG and an asymmetric critic. Both tested removals produce substantially lower reward under matched settings. The figure does not isolate all choices: there is no complete ablation here for procedural diversity, LSTM memory, every randomization term or the perception pipeline. The nine-billion-step ablation horizon also differs from the 120-billion-step checkpoint study.

Source: Simulation · Paper Fig. 8 · §IV-E

## 25. References, videos and source material

Paper figures and project videos retain their original authorship. Custom diagrams are explanatory schematics. Real-world aggregate charts derive from the published Table II data, provided in CSV form alongside this deck. The discussion section explicitly labels untested extensions. The package also contains English speaker notes and a detailed Chinese narrative assessment.

Source: Sources and attribution