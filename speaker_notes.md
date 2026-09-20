# SimToolReal · English Speaker Notes

Suggested duration: 20–25 minutes plus discussion. Slides 1–17 are the main talk. Slides 18–21 are backup. Use Right / Space for step reveals, A to reveal a whole page, F for fullscreen, and V for video play/pause. Clips are silent and run at original speed.

## 1. SimToolReal

The central question is how to reuse a dexterous controller across unfamiliar tools and goal trajectories. SimToolReal trains such a controller on simple synthetic tools in simulation. At deployment, human demonstrations provide object motion goals, while the robot decides how its own hand and arm should realize them. We will discuss why dexterous tool use is difficult, question what demonstrations should provide, and then explain the object-centric controller and its evidence. The paper is listed in the RSS 2026 proceedings.

Source: Kedia et al. · SimToolReal · arXiv:2602.16863v2

## 2. Why is robot tool manipulation difficult?

This short author video motivates why tool manipulation is more than moving the end effector. Thin objects constrain initial finger placement. Large orientation changes can exceed the arm workspace under a fixed grasp. Tool-environment contact adds forces and torques. Multi-fingered hands offer contact choices but make teleoperation and learning harder. These difficulties motivate the comparisons on the next pages.

Source: Paper §I · Official project video ToolManipHard.mp4

## 3. Why not simply imitate a demonstration?

Pause on the opening question and invite imitation learning, retargeting, planning or RL as possible routes. Reveal the two demonstration routes in turn. The concern is the cost and suitability of action supervision for this dexterous setting. Diffusion or VLA policies can be trained through imitation, but changing the policy architecture does not itself supply high-quality contact data. This is motivation, not evidence that IL cannot work. The paper has no strong learned IL/VLA baseline. The final question leads directly to the paper's proposed interface.

Source: Paper §I–II · Brainstorm framing · No direct learned IL/VLA comparison

## 4. The transferable interface is the tool motion

This is the conceptual pivot. The human provides a sequence of rigid-tool configurations. A goal-conditioned controller learns how to move the tool between configurations using this robot's arm and hand. It is related to functional or object-centric retargeting, but the controller is trained in advance on randomized primitives rather than trained for each demonstration. The arrow from goals to policy denotes conditioning, not policy fine-tuning.

Source: Paper §III-A · Presenter schematic

## 5. A reusable controller inside a three-stage system

Start with the shaded training lane. Procedural tools and random goals train one reusable actor in simulation. Reveal task setup next: a human RGB-D demonstration and semi-automated perception produce a mesh, a grasp box and goal poses. Reveal online execution last. The mesh supports pose tracking, while robot proprioception and the current tool pose close the loop around the frozen actor. The dashed connection denotes transferring policy weights, not fine-tuning. At deployment, the actor receives the current goal and grasp box in addition to live state. This simplified architecture combines the paper's training and deployment diagrams. Low-level perception details are intentionally expanded in the next pages rather than inside this overview.

Source: Paper §III-B–C · Simplified redraw of Figs. 2–3

## 6. The actor converts object goals into robot actions

Explain each input before revealing the output. Proprioception describes the robot. The tracked tool pose and target pose describe the goal-reaching problem. A coarse box identifies the graspable region. LSTM history helps under partial observation, including unknown physical properties. The MLP produces actions that become 29 arm and hand joint-position targets. The actor does not consume RGB directly, detailed meshes or explicit mass and inertia estimates. The asymmetric critic uses privileged state only during training. Exact layer sizes are in backup.

Source: Paper §III-A–B · Table I · Simplified actor diagram

## 7. Training varies objects and goals together

Tools vary in handle/head dimensions and density. The full reward includes smoothness, grasp shaping and progress toward pose goals. SAPG, an asymmetric critic and domain randomization support learning and transfer. At reset the environment samples an object and robot initialization. The first goal can require a large motion or reorientation. Subsequent goals are near the preceding one, encouraging trajectory-like transitions. Unlike test-time demonstrations, these training goals are randomly generated. Procedural object diversity broadens the contact and inertial situations the policy encounters. IsaacGym provides 24,576 parallel environments in the reported configuration.

Source: Paper §III-B · Table I · Presenter schematic

## 8. Perception supplies state, goals advance on success

The setup is semi-automated: user point prompts identify the tool and handle/head, SAM 3D uses captured depth for metric scale, and FoundationPose extracts the demonstrated trajectory and tracks the live tool. Separate the three rates explicitly. Human trajectory processing downsamples a 30 Hz video trajectory to 3 Hz waypoints and trims its stationary pre-grasp portion. The live pose tracker updates at 30 Hz. Robot control runs at 60 Hz. The active goal changes only after the pose error falls below the threshold, not every one-third of a second. The robot may therefore take longer to execute a difficult transition than the person did. Zero-shot means no target-tool or target-trajectory policy training. A demonstration, geometry setup and live sensing are still required.

Source: Paper §III-C · Table I · Goal Pose Sequence appendix · Presenter schematic

## 9. The closed loop follows unseen tool trajectories

The project video places the human demonstration and extracted goal poses alongside real robot execution. Use it to connect the two branches of the pipeline. The robot policy does not update its weights on this new trajectory. Goal progression is event-driven, as described on the preceding slide. Treat the rendered goal display as an explanatory visualization, not additional evidence from a digital-twin experiment.

Source: Official project video · inference.mp4 · Paper §III-C

## 10. Real-world transfer across six tool categories

DexToolBench evaluates six categories with two instances and two trajectories each, using five rollouts per variation. This chart recomputes category means from all 120 published rollout values. The evaluation threshold is 2 cm maximum pose-keypoint error, combining translation and rotation. Erasers need less in-hand rotation, while screwdrivers require reorientation and spinning. The overall mean is 79.3% trajectory progress, not 79.3% completed tasks. Screwdriver trials involve free-space spinning rather than screw insertion or tightening. Source rounding may affect the last decimal.

Source: Real robot · Presenter aggregation of Table II · 20 trials per category

## 11. In-hand control matters in the brush comparison

The comparison isolates different limitations. Kinematic retargeting does not reliably establish the required contacts. A fixed grasp can work when no tool rotation is needed, but the harder starting orientation makes the required arm motion problematic. SimToolReal can rotate the tool within the hand. On the easier variation the difference from fixed grasp is 98.0 minus 61.0, or 37 percentage points. Do not call this a 37 percent relative improvement or an average across all benchmark tasks. The fixed-grasp baseline initially uses SimToolReal to acquire the object.

Source: Real robot · Paper Fig. 5 · Task Progress (%) · Limited to two brush variations

## 12. Specialists are sensitive to changed tools and goals

The specialists use the same policy architecture and reward setup, but train on one object and one trajectory per category. Six specialists are evaluated over ten rollouts each per condition. The general policy performs comparably on their training configurations and is much more robust to changed object instances or task trajectories. This is simulation evidence and should not be described as a real-world comparison against specialists. The figure supports qualitative magnitude comparisons; no invented exact bar heights are reported.

Source: Simulation · Paper Fig. 6 · §IV-C

## 13. Perception is the largest recorded failure category

These percentages are shares of failures, not shares of all 120 trials. Pose tracking struggles with heavy hand occlusion, rotational symmetry and low contrast. The paper describes a long screwdriver with colored tape to reduce rotational symmetry. Heavy objects are more likely to drop, and thin geometry makes in-hand reorientation harder. This decomposition motivates improving state estimation, but it does not show that a VLM alone can supply accurate high-rate pose tracking.

Source: Real robot · Paper §IV-A · Real-World Experiment Additional Analysis appendix

## 14. The pose interface leaves important state out

The limitations follow from the strength of the abstraction. By discarding much of the scene and task, the controller becomes reusable, but it also loses information needed for collision avoidance, contact outcomes and dynamic replanning. The authors explicitly acknowledge rigid-tool, environment-blind, high-force and fixed-goal limitations. These are the correct starting point for the proposed research extensions.

Source: Paper §V · Author-acknowledged limitations

## 15. How far can a compact task interface take us?

This page consolidates the first two research hypotheses. First, reusable RL motor skills could complement end-to-end action models, but the work does not demonstrate autonomous online learning in the wild. Its perception already uses vision foundation models. Second, object-centric pose goals may inspire compact interfaces for other interactions, but six-dimensional rigid pose alone will be insufficient for articulated, deformable or force-sensitive tasks. Both statements are extensions to test, not conclusions established by SimToolReal.

Source: Presenter discussion · Motivated by paper §III–V

## 16. A lightweight VLM could improve the semantic interface

A clean first experiment would compare manual point prompts with VLM-proposed regions while holding the motor policy fixed, measuring intervention count, pose accuracy, latency and task completion. The original idea is promising if the module boundary is precise. A lightweight VLM might select the tool and graspable region, interpret a demonstration, or propose and revise subgoals. That is different from continuously estimating metric six-degree-of-freedom pose at the accuracy and rate required by the controller. A hybrid with geometry-grounded tracking and confidence monitoring is a more defensible first experiment. No result in this paper compares VLMs or proves such a replacement improves generalization.

Source: Presenter proposal · Motivated by the semi-automated perception pipeline and failure analysis

## 17. A reusable motor skill needs a well-chosen task interface

Close by returning to the initial question about how robots can acquire tool-use skills. This paper demonstrates an effective division of labor: human object-motion specification, geometric perception and a simulation-trained motor controller. The most general lesson is about interface design, not a claim that all robotics problems reduce to pose tracking. Invite discussion on how to identify sufficient state and objectives for broader interactions.

Source: Paper contributions and presenter synthesis

## 18. Pose error couples translation and rotation

The reward uses fixed scales of 14 by 3 by 3 centimeters to define four local keypoints. This makes pitch and yaw matter more than roll around the long tool axis. The observation representation instead uses instance-specific dimensions. Distinguishing the two prevents an incorrect interpretation of the evaluation tolerance as only translation accuracy or a uniform angular tolerance for every rotation axis.

Source: Paper Reward Function Details appendix · Table I · §IV

## 19. Ablations identify important RL ingredients

The full policy uses SAPG and an asymmetric critic. Both tested removals produce substantially lower reward under matched settings. The figure does not isolate all choices: there is no complete ablation here for procedural diversity, LSTM memory, every randomization term or the perception pipeline. The nine-billion-step ablation horizon also differs from the 120-billion-step checkpoint study.

Source: Simulation · Paper Fig. 8 · §IV-E

## 20. Implementation details that matter for reproduction

The actor is not a small policy in the sense of having only a tiny MLP. It includes a 1024-unit recurrent layer and several large hidden layers. The paper reports simulator parallelism and environment-step counts, but this deck does not infer wall-clock time or GPU cost from them. Reproducing transfer also requires the matched robot gains, delays, safety ranges and perception calibration described in the appendix.

Source: Paper Table I · Simulation Training Details and Sim-to-Real Details appendices

## 21. References, videos and source material

Paper figures and project videos retain their original authorship. Custom diagrams are explanatory schematics. Real-world aggregate charts derive from the published Table II data, provided in CSV form alongside this deck. The discussion section explicitly labels untested extensions. The package also contains English speaker notes and a detailed Chinese narrative assessment.

Source: Sources and attribution