# SimToolReal · English Speaker Notes

Suggested duration: 35–40 minutes plus discussion. Slides 1–33 are the main talk. Slides 34–39 are backup. Use Right / Space for step reveals, A to reveal a whole page, F for fullscreen, and V for video play/pause. Clips are silent and run at original speed.

## 1. SimToolReal

The central question is how to reuse a dexterous controller across unfamiliar tools and goal trajectories. SimToolReal trains such a controller on simple synthetic tools in simulation. At deployment, human demonstrations provide object motion goals, while the robot decides how its own hand and arm should realize them. We will first compare learning routes, then explain the abstraction and pipeline, examine the evidence, and end with three research hypotheses. The paper is listed in the RSS 2026 proceedings.

Source: Kedia et al. · SimToolReal · arXiv:2602.16863v2

## 2. Everyday tools demand dexterous control

Play a short segment and ask the audience to watch the relation between the tool and fingers rather than only the arm path. A brush task bundles several behaviors that are often studied separately. The clip is an illustrative author-provided demonstration, not an aggregate performance measure. Pause after the manipulation becomes clear and pose the technical-route question.

Source: Official project video · Brush_1080p_compressed.mp4

## 3. Tool use combines several contact problems

This short author video motivates why tool manipulation is more than moving the end effector. Thin objects constrain initial finger placement. Large orientation changes can exceed the arm workspace under a fixed grasp. Tool-environment contact adds forces and torques. Multi-fingered hands offer contact choices but make teleoperation and learning harder. These difficulties motivate the comparisons on the next pages.

Source: Paper §I · Official project video ToolManipHard.mp4

## 4. How could a robot learn to use a new tool?

Pause here before revealing the last sentence. Invite concrete suggestions: teleoperated demonstrations, human video, a pretrained action model, planning, or reinforcement learning. These are not mutually exclusive. The comparison is meant to identify where data collection, correspondence, contact reasoning, and task-specific engineering enter the pipeline.

Source: Presenter framing based on §I–II

## 5. Several routes place the burden in different places

This is a conceptual taxonomy, not an experimental leaderboard. Diffusion describes a policy parameterization or generative mechanism, imitation learning describes the learning signal, and a VLA describes an architecture and conditioning interface. They do not form disjoint alternatives. SimToolReal itself combines video-derived guidance, learned perception, and reinforcement learning. Its distinctive choice is to reuse one goal-reaching controller across objects and trajectories.

Source: Conceptual comparison · Paper §I–II · No direct IL/VLA baseline in this paper

## 6. Imitation learning needs the right action data

Explain the difference between learning from robot actions and using a human video to specify the outcome trajectory. The paper argues that collecting high-quality dexterous teleoperation data is difficult. That is not evidence that imitation learning or VLAs cannot solve these tasks, and the paper does not compare against strong modern learned action baselines. The narrower question is whether object motion can serve as an easier-to-transfer interface.

Source: Paper §I–II · Motivation, not a universal claim about IL

## 7. Reinforcement learning shifts the engineering cost

The motivation is to amortize learning across tool-like objects rather than train a specialist after receiving each new demonstration. Simulation does not eliminate engineering: the robot model, randomization, reward shaping, safety constraints and perception pipeline still need design. What the authors remove is target-object and target-trajectory policy training at deployment.

Source: Paper §I–III

## 8. The transferable interface is the tool motion

This is the conceptual pivot. The human provides a sequence of rigid-tool configurations. A goal-conditioned controller learns how to move the tool between configurations using this robot's arm and hand. It is related to functional or object-centric retargeting, but the controller is trained in advance on randomized primitives rather than trained for each demonstration. The arrow from goals to policy denotes conditioning, not policy fine-tuning.

Source: Paper §III-A · Presenter schematic

## 9. A 6D pose specifies position and orientation

A rigid object's pose has three translational and three rotational degrees of freedom. It need not be encoded as six Euler-angle coordinates; the paper uses keypoint-based features and distances. Reveal lift, reorientation and swing in order. This schematic is a task interface, not a measured demonstration. At runtime the policy receives the current goal. The goal sequence is spatial and event-driven, so the robot does not have to reproduce the human's timing.

Source: Paper §III-A · Illustrative pose sequence, not experimental data

## 10. A single policy repeatedly solves goal reaching

The compact notation hides recurrent history in the LSTM. The policy acts on proprioception, object pose, a coarse grasp-region descriptor and the current goal. It produces actions that become arm and hand joint-position targets. The abstraction reduces task specification complexity without claiming that all tool interaction physics are determined by pose. This distinction will return when we discuss task completion and force.

Source: Paper §III-A–B · Recurrent state omitted from compact notation

## 11. Common structure is a designed prior

The authors do not train a semantic module to discover that all tools share a purpose. They choose a handle–head structural family and generate simple geometry with varied size and density. The policy receives a coarse grasp box, not a detailed mesh or an explicit estimate of mass and inertia. LSTM history helps infer unobserved properties through interaction. The small boxes shown here are schematic, not the actual distribution of sampled assets.

Source: Paper §III-B · Procedural Asset Generation appendix · Presenter schematic

## 12. Training varies objects and goals together

At reset the environment samples an object and robot initialization. The first goal can require a large motion or reorientation. Subsequent goals are near the preceding one, encouraging trajectory-like transitions. Unlike test-time demonstrations, these training goals are randomly generated. Procedural object diversity broadens the contact and inertial situations the policy encounters. IsaacGym provides 24,576 parallel environments in the reported configuration.

Source: Paper §III-B · Table I · Presenter schematic

## 13. A shared reward induces the component skills

Avoid calling this reward-free learning or a single pure pose loss. The full reward includes smoothness and grasp shaping. The goal reward uses improvement over the best distance achieved so far rather than rewarding static proximity, and a large success bonus promotes completion. Once lifted, repeated random pose reaching induces reorientation and stable grasping behavior. The appendix contains the complete coefficients.

Source: Paper §III-B · Eq. 1–2 · Reward Function Details appendix

## 14. Learning and transfer need more than object diversity

SAPG is Split and Aggregate Policy Gradients, a PPO-family method that maintains exploratory policies and aggregates experience. The critic receives clean states and additional physical information unavailable to the deployed actor. Domain randomization targets real observation and actuation imperfections. The paper's ablations establish the importance of SAPG and the asymmetric critic in its setup, not the superiority of this optimizer in all settings.

Source: Paper §III-B · Sim-to-Real Details appendix

## 15. Training on synthetic tools produces dexterous motion

Play the training excerpt. Direct attention to the changing relationship between fingers and object as the policy reaches targets. The green object is a target visualization, not a second physical object. This clip illustrates what the training environment looks like. It does not independently quantify training efficiency or prove generalization.

Source: Official project video · training.mp4 · Paper §III-B

## 16. Deployment adds perception and a human demonstration

Walk through the left side first. RGB-D imagery supplies an object mesh, a grasp region and a tool trajectory. Then move to the right side, where online pose estimates and proprioception close the loop around the same pretrained policy. A mesh is still acquired for the new real object, but it is used in perception, not to retrain a target-object simulator policy.

Source: Paper Fig. 3 · §III-C

## 17. Geometry extraction is semi-automated

The appendix qualifies any claim of fully automatic tool understanding. The user points to the target object and then to handle/head regions in rendered views. SAM 2 propagates masks. SAM 3D reconstructs a mesh using captured depth rather than relying on predicted monocular scale. The handle and head establish the grasp-region box and canonical coordinate frame. The paper uses vision foundation models already, so it should not be framed as a foundation-model-free system.

Source: Human Video Processing appendix · Fig. 12

## 18. Goal switching is event-driven

Separate the three rates explicitly. Human trajectory processing downsamples a 30 Hz video trajectory to 3 Hz waypoints and trims its stationary pre-grasp portion. The live pose tracker updates at 30 Hz. Robot control runs at 60 Hz. The active goal changes only after the pose error falls below the threshold, not every one-third of a second. The robot may therefore take longer to execute a difficult transition than the person did.

Source: Paper §III-C · Table I · Goal Pose Sequence appendix · Presenter schematic

## 19. The closed loop follows unseen tool trajectories

The project video places the human demonstration and extracted goal poses alongside real robot execution. Use it to connect the two branches of the pipeline. The robot policy does not update its weights on this new trajectory. Goal progression is event-driven, as described on the preceding slide. Treat the rendered goal display as an explanatory visualization, not additional evidence from a digital-twin experiment.

Source: Official project video · inference.mp4 · Paper §III-C

## 20. What “zero-shot” means in this paper

This slide prevents the most likely misunderstanding. Zero-shot does not mean no human input, no object modeling anywhere, or autonomous discovery of what task to do. It means the manipulation policy does not undergo target-object or target-trajectory training. The human video and perception setup provide information at deployment. This also explains why the system is compatible with, rather than necessarily opposed to, high-level foundation models.

Source: Paper §III-C · Human Video Processing appendix

## 21. DexToolBench evaluates trajectory progress

There are five rollouts per object-task variation. The hardware is a 7-DoF KUKA iiwa arm with a 22-DoF Sharpa hand. The paper counts the fraction of sequential goal poses reached, with a two-centimeter keypoint distance threshold at evaluation. This is not a two-centimeter translation-only rule. In particular, screwdriver trials measure free-space spinning, not successful screw insertion or tightening.

Source: Paper §IV · DexToolBench appendix · Task Progress definition

## 22. Transfer is strong but uneven across tools

This chart is recomputed from the per-rollout entries in Table II rather than estimated from raster bars. Equal numbers of trials per category make the overall rollout mean and category mean equivalent here. Erasers need less in-hand reorientation and achieve full trajectory progress. Screwdrivers require both reorientation and continuous spinning and are the hardest category. These averages are not binary task success rates, and this chart does not add uncertainty estimates that the paper has not provided.

Source: Real robot · Presenter aggregation of paper Table II · Units: Task Progress (%)

## 23. In-hand control matters in the brush comparison

The comparison isolates different limitations. Kinematic retargeting does not reliably establish the required contacts. A fixed grasp can work when no tool rotation is needed, but the harder starting orientation makes the required arm motion problematic. SimToolReal can rotate the tool within the hand. On the easier variation the difference from fixed grasp is 98.0 minus 61.0, or 37 percentage points. Do not call this a 37 percent relative improvement or an average across all benchmark tasks. The fixed-grasp baseline initially uses SimToolReal to acquire the object.

Source: Real robot · Paper Fig. 5 · Task Progress (%) · Limited to two brush variations

## 24. Specialists are sensitive to changed tools and goals

The specialists use the same policy architecture and reward setup, but train on one object and one trajectory per category. Six specialists are evaluated over ten rollouts each per condition. The general policy performs comparably on their training configurations and is much more robust to changed object instances or task trajectories. This is simulation evidence and should not be described as a real-world comparison against specialists. The figure supports qualitative magnitude comparisons; no invented exact bar heights are reported.

Source: Simulation · Paper Fig. 6 · §IV-C

## 25. The proxy objective predicts downstream progress

The left curve measures training reward on randomized primitive objects. The right measures zero-shot Task Progress on DexToolBench objects in simulation at checkpoints. They trend upward together, although the right curve is not strictly monotonic. The plot reaches 120 billion environment steps, so avoiding real demonstrations does not make this computation-free. This is correlational evidence for the usefulness of the training objective, not a theorem or an in-the-wild scaling law.

Source: Simulation · Paper Fig. 7 · §IV-D · Horizontal axis: billions of environment steps

## 26. Perception is the largest recorded failure category

These percentages are shares of failures, not shares of all 120 trials. Pose tracking struggles with heavy hand occlusion, rotational symmetry and low contrast. The paper describes a long screwdriver with colored tape to reduce rotational symmetry. Heavy objects are more likely to drop, and thin geometry makes in-hand reorientation harder. This decomposition motivates improving state estimation, but it does not show that a VLM alone can supply accurate high-rate pose tracking.

Source: Real robot · Paper §IV-A · Real-World Experiment Additional Analysis appendix

## 27. Recovery depends on retaining usable state feedback

Play the recovery excerpt as a concrete example of why closed-loop policies matter. The authors report regrasp attempts despite training resets after drops. Keep the claim conditional: the object must remain in the workspace and the visual tracker must still provide usable state. The clip does not establish reliability under arbitrary disturbances or unseen clutter.

Source: Official project video · failureRecovery.m4v · Paper §IV-A

## 28. The pose interface leaves important state out

The limitations follow from the strength of the abstraction. By discarding much of the scene and task, the controller becomes reusable, but it also loses information needed for collision avoidance, contact outcomes and dynamic replanning. The authors explicitly acknowledge rigid-tool, environment-blind, high-force and fixed-goal limitations. These are the correct starting point for the proposed research extensions.

Source: Paper §V · Author-acknowledged limitations

## 29. A complementary route beyond end-to-end action models

Refine the original hypothesis by separating acquiring a controller in simulation from learning new skills online in the world. SimToolReal establishes transfer of a pretrained controller within its tested setup. It already relies on vision foundation models. The useful contrast is therefore with scaling end-to-end action learning as the only route to motor competence, not with large models in every part of the system. A semantic planner and a reusable RL controller may be complementary.

Source: Presenter hypothesis · Grounded in §III–V · Not an experimental conclusion

## 30. Other interactions may admit compact task interfaces

The strongest extension is not that everything reduces to six-dimensional pose. It is that many tasks may admit a compact, reusable goal interface paired with a learned controller. Whether that interface is sufficient depends on the interaction. Opening a mechanism requires articulation constraints, insertion often needs force and compliance, and deformable manipulation needs shape state. These examples are proposed research directions rather than tasks validated by the paper.

Source: Presenter hypotheses · Beyond the paper's rigid-tool setting

## 31. A lightweight VLM could improve the semantic interface

The original idea is promising if the module boundary is precise. A lightweight VLM might select the tool and graspable region, interpret a demonstration, or propose and revise subgoals. That is different from continuously estimating metric six-degree-of-freedom pose at the accuracy and rate required by the controller. A hybrid with geometry-grounded tracking and confidence monitoring is a more defensible first experiment. No result in this paper compares VLMs or proves such a replacement improves generalization.

Source: Presenter proposal · Motivated by the semi-automated perception pipeline and failure analysis

## 32. Three experiments would test these extensions

These are suggested experiments, not an implementation claim. Change one part of the pipeline at a time and measure both interface quality and end-to-end outcomes. A VLM may reduce setup effort while worsening precision, so intervention counts alone are insufficient. For pose-plus-contact interfaces, retraining may be necessary; comparisons should control the simulation budget and evaluation objects. Functional success should be task-specific, such as debris removed or insertion completed, rather than inferred from pose progress.

Source: Presenter experimental agenda · Not evaluated in SimToolReal

## 33. A reusable motor skill needs a well-chosen task interface

Close by returning to the initial question about how robots can acquire tool-use skills. This paper demonstrates an effective division of labor: human object-motion specification, geometric perception and a simulation-trained motor controller. The most general lesson is about interface design, not a claim that all robotics problems reduce to pose tracking. Invite discussion on how to identify sufficient state and objectives for broader interactions.

Source: Paper contributions and presenter synthesis

## 34. Pose error couples translation and rotation

The reward uses fixed scales of 14 by 3 by 3 centimeters to define four local keypoints. This makes pitch and yaw matter more than roll around the long tool axis. The observation representation instead uses instance-specific dimensions. Distinguishing the two prevents an incorrect interpretation of the evaluation tolerance as only translation accuracy or a uniform angular tolerance for every rotation axis.

Source: Paper Reward Function Details appendix · Table I · §IV

## 35. Ablations identify important RL ingredients

The full policy uses SAPG and an asymmetric critic. Both tested removals produce substantially lower reward under matched settings. The figure does not isolate all choices: there is no complete ablation here for procedural diversity, LSTM memory, every randomization term or the perception pipeline. The nine-billion-step ablation horizon also differs from the 120-billion-step checkpoint study.

Source: Simulation · Paper Fig. 8 · §IV-E

## 36. Implementation details that matter for reproduction

The actor is not a small policy in the sense of having only a tiny MLP. It includes a 1024-unit recurrent layer and several large hidden layers. The paper reports simulator parallelism and environment-step counts, but this deck does not infer wall-clock time or GPU cost from them. Reproducing transfer also requires the matched robot gains, delays, safety ranges and perception calibration described in the appendix.

Source: Paper Table I · Simulation Training Details and Sim-to-Real Details appendices

## 37. Real-world task breakdown: Hammer, marker and eraser

Each row averages five trials from Table II. Use the accompanying CSV for the five individual values. The chart and table compute means from the rounded per-rollout entries published in the paper, so an occasional last-decimal difference from a paper average is possible. These are fractions of pose goals reached, not fractions of trials that completed the physical task.

Source: Real robot · Recomputed from Table II · Five rollouts per row

## 38. Real-world task breakdown: Brush, spatula and screwdriver

Each row averages five trials from Table II. Use the accompanying CSV for the five individual values. The chart and table compute means from the rounded per-rollout entries published in the paper, so an occasional last-decimal difference from a paper average is possible. These are fractions of pose goals reached, not fractions of trials that completed the physical task.

Source: Real robot · Recomputed from Table II · Five rollouts per row

## 39. References, videos and source material

Paper figures and project videos retain their original authorship. Custom diagrams are explanatory schematics. Real-world aggregate charts derive from the published Table II data, provided in CSV form alongside this deck. The discussion section explicitly labels untested extensions. The package also contains English speaker notes and a detailed Chinese narrative assessment.

Source: Sources and attribution