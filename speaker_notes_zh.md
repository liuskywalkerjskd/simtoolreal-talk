# SimToolReal 中文逐页汇报稿

建议时长：正文 32–37 分钟（含循环 GIF 展示），另加讨论。第 1–24 页为正文，第 25 页为来源备份页。每页均与 slides.html 的页码和英文标题严格对应。

## 1. SimToolReal：从工具运动到机器人技能

**对应英文标题：** SimToolReal

**建议时间：** 约 50 秒

大家好，今天汇报的工作是 SimToolReal。右侧循环展示了刷子、锤子、马克笔和铲子四类真实机器人实验，先让大家直观看到这篇工作希望统一处理的场景。它关心的不是如何为一把特定的锤子训练一套动作，而是一个更一般的问题：如果我们只告诉机器人“工具应该怎样运动”，能不能让同一个灵巧操作策略自己决定手臂和手指应该怎样配合？

论文的核心做法是，在仿真中用大量程序化工具和随机位姿目标训练一个 object-centric recurrent policy。到了真实世界，人类演示只负责给出工具的目标运动，视觉系统负责估计当前工具位姿，而策略本身不再针对新工具或新任务做训练。接下来我会先从“我们通常会怎么教机器人使用工具”开始，再逐步进入位姿跟踪、仿真训练、LSTM 策略、真实部署和实验。

**操作提示：** 封面 GIF 会自动循环。至少展示两类工具后，再强调 reusable controller 与 tool motion 两个关键词。

## 2. 如果让机器人学会使用工具，你会怎么做？

**对应英文标题：** How would you teach a robot to use tools?

**建议时间：** 约 90 秒

先不看论文，我想请大家思考一个问题：假设现在要让机器人学会使用一把新的刷子、锤子或铲子，你会先搭建什么？

一种自然路线是采集机器人的示范数据，直接从 observation-action pairs 学习策略，例如行为克隆、Diffusion Policy 或 VLA。第二种路线是利用更容易获得的人类演示，再做跨 embodiment 的 retargeting。第三种路线是不直接告诉机器人每个关节怎样动，而是让它在仿真里通过交互学习稳定抓取和操纵。

这三条路线不是互斥的，也不是完整分类。真正值得追问的是：每条路线需要什么数据？谁来解决薄工具抓取、手内旋转和接触力？SimToolReal 选择的是第三条路线，但它仍然使用人类演示来提供任务级的工具运动。

**操作提示：** 先只显示问题，让听众回答；随后按三次前进键依次出现三条路线。

## 3. 为什么工具使用中的示范学习更困难？

**对应英文标题：** What makes demonstration-based tool use difficult?

**建议时间：** 约 100 秒

工具使用比普通 pick-and-place 更依赖接触质量。刷子、马克笔和螺丝刀通常很细，抓取容错小；任务中还可能出现手内旋转、持续接触以及外界反作用力。

如果采集机器人动作示范，优势是动作空间完全匹配，但灵巧手遥操作本身很困难，尤其难稳定示范细小接触和力反馈。如果使用人类动作，采集更方便，但人手和机器人手的运动学差异很大。即使视觉上复现了手指运动，也不代表机器人能形成物理稳定的抓取。

这里需要控制结论边界：论文并没有证明 imitation learning 或 VLA 不适合工具使用，也没有和强 IL/VLA baseline 做系统比较。它提出的是另一种分工方式——示范只描述工具怎么动，机器人如何实现这段运动则交给仿真 RL 学习。

**操作提示：** 依次揭示两类示范的瓶颈，最后再出现底部问题。

## 4. 把工具使用转化为连续的位姿到达问题

**对应英文标题：** Tool use as a sequence of pose-reaching problems

**建议时间：** 约 90 秒

这就是全文最重要的抽象。作者不要求人类演示机器人手指应该怎样运动，而是从演示中提取刚性工具的一系列目标位姿。策略每次接收当前工具状态和下一个目标位姿，然后输出机器人 7 个手臂关节与 22 个手部关节的控制目标。

这样，任务层只规定“工具应该到哪里、朝向哪里”，而抓取方式、手内调整和机器人自身的接触策略由 RL 在仿真中发现。它与 object-centric 或 functional retargeting 有联系，但这里的控制器在看到测试演示之前就已经训练完毕；目标序列只是 policy conditioning，不会触发新的 policy fine-tuning。

**操作提示：** 讲清楚 goal conditioning 与 policy training 的区别。

## 5. 6D 位姿同时描述位置与朝向

**对应英文标题：** A 6D pose specifies position and orientation

**建议时间：** 约 90 秒

一个刚性工具的位姿包含三维位置和三维朝向。这里写成 SE(3) 中的旋转矩阵 R 和位置 p，而不必把“6D”理解成一定使用六个欧拉角。

动画把一次工具动作拆成 lift、reorient 和 swing。重点不是这三个动作本身，而是说明很多看似复杂的工具使用，可以在工具层面表达为一串目标位姿。运行时，策略只看到当前目标；到达后再切换到下一个，所以机器人不需要严格复现人类演示的时间节奏。

需要说明，这个动画是为了帮助理解任务接口，并不是论文中的定量实验轨迹。

**操作提示：** 依次播放 lift、reorient、swing 三个构建步骤，让听众先观察位置变化，再观察朝向变化。

## 6. 仿真训练 Pipeline：通过交互学习位姿到达

**对应英文标题：** Training pipeline: learn pose reaching through interaction

**建议时间：** 约 120 秒

这一页只讲仿真训练，不包含真实部署中的 RGB-D 和视觉模型。左侧是程序化生成的工具、随机物理参数、初始状态和随机目标位姿。actor 接收受限且带噪声、带延迟的 observation，输出手臂和灵巧手动作。物理仿真器推进环境，计算下一状态与 reward，再形成闭环数据。

训练时还有 asymmetric critic。actor 只看未来真实部署能够提供的输入，而 critic 可以使用精确仿真状态和额外进度信息，从而帮助训练。优化算法是 SAPG，可以理解为 PPO-family 方法：多个策略用于探索，它们采集的经验汇总到 leader policy 更新。论文报告使用 IsaacGym 同时运行 24,576 个环境。

最终得到的是一个通用 actor，而不是每收到一段人类演示就重新训练一个 task-specific policy。尤其注意：这一阶段没有人类任务轨迹，也没有真实相机。

**操作提示：** 按动画顺序先讲环境闭环，再揭示 asymmetric critic。

## 7. SAPG：拆分探索，再聚合经验

**对应英文标题：** SAPG splits exploration and aggregates experience

**建议时间：** 约 100 秒

SAPG 的全称是 Split and Aggregate Policy Gradients，可以把它理解成面向大规模并行仿真的 PPO 扩展。它没有替换 actor-critic 框架，主要改变的是如何组织探索数据，以及 leader policy 怎样复用这些数据。

第一步是 Split。把大量并行环境分给一个 leader policy 和多个 follower policies。不同 follower 使用不同强度的 entropy regularization，因此它们会形成不同的 exploration-exploitation 行为。有些策略更倾向于稳定利用当前解，有些策略会尝试更分散的动作。每个策略在自己的环境 block 中采集数据，followers 仍然使用自己的 on-policy 数据执行常规 PPO 更新。图里只画了几个代表性的 policy block，π₁ 到 πM 表示一般的策略 population，并不表示系统一定只有四个策略。

第二步是 Aggregate。Leader 使用自己的 on-policy 数据，同时从 follower datasets 中采样经验。由于这些轨迹并不是 leader 自己生成的，所以属于 off-policy experience，需要通过 importance weighting 修正策略分布差异。最终部署的是聚合后更新的 leader policy。

直观上，普通 PPO 像一个探索者同时运行很多环境；SAPG 则让一组探索风格不同的策略分别寻找可行行为，再让 leader 吸收更广泛的经验。它适合这里的原因是灵巧手动作维度高、接触行为难探索，而且仿真一次可以并行运行上万个环境。

**操作提示：** 第一次前进键展示 Split：并行环境分配给 leader 和 followers；第二次展示 Aggregate：followers 的经验经过 importance weighting 汇入 leader update。

## 8. SAPG 与 PPO：相同 Critic 下的受控对比

**对应英文标题：** SAPG learns more effectively than PPO in this setting

**建议时间：** 约 75 秒

这一页紧接上一页，回答一个自然问题：Split 和 Aggregate 在这个任务里是否真的比普通 PPO 更有效？

先看青色和灰色曲线。两者都使用 asymmetric critic，主要差异是优化时的探索和数据使用方式。普通 PPO 依赖单个 policy 产生的 on-policy experience；SAPG 让多个探索风格不同的 policy 收集数据，然后用 importance weighting 将 follower experience 汇入 leader update。

在这个 90 亿 environment steps 的消融中，SAPG 的 episode reward 持续上升，PPO 则停在明显更低的平台。这说明在高维灵巧操作的探索问题上，多样化探索和经验聚合确实有价值。

橙色曲线又提供了一个边界：保留 SAPG 但换成 symmetric critic 后，学习仍然很差。因此更准确的结论是，论文支持 SAPG 与 asymmetric critic 的组合，而不是证明所有提升都只来自 SAPG。同时，纵轴是仿真中的 training reward，不是真机工具任务的功能成功率。

**操作提示：** 先揭示受控对比，再揭示实验解读；最后说明 symmetric critic 消融和指标边界。

## 9. 程序化工具覆盖几何与质量变化

**对应英文标题：** Procedural tools cover shape and mass variation

**建议时间：** 约 80 秒

训练分布由程序化工具提供。作者预先规定了 handle-head 这一结构先验，然后随机化尺寸、形状、密度以及相关物理属性。策略获得的是一个粗略 grasp-region box 和对象中心的位姿特征，不是完整 CAD mesh，也没有显式的质量或惯量估计。

因此，论文所谓工具之间的“共同点”并不是一个网络自动发现了工具的语义用途，而是研究者设计了一个统一几何接口：刚性工具位姿加可抓取区域。LSTM 可以利用交互历史适应未观测属性，但论文没有证明 hidden state 中存在一个可解释的质量估计器。

**操作提示：** 指出图中的小工具只是分布示意，不是论文资产的逐一复刻。

## 10. RL 训练信号：每个 Reward 如何构造

**对应英文标题：** RL training signal: how each reward term is constructed

**建议时间：** 约 180 秒

这一页需要先做一个术语澄清。论文给出的 smooth、grasp 和 goal 三项是环境 reward，不是神经网络直接最小化的三项 loss。SAPG 最终仍然根据这些 reward 产生的 return，优化 actor-critic objective。

第一项是 smoothness reward，实际上是负的惩罚项。它分别计算 7 个手臂关节和 22 个手部关节当前速度的 L1 norm，再乘以各自权重。这样可以抑制过快、抖动式的关节运动。

第二项是 grasp reward，由 approach 和 lift 组成。approach 并不是简单奖励“离物体近”，而是记录本 episode 到目前为止最小的平均 fingertip-to-object distance，只奖励当前距离相对历史最优值的进一步改善。lift 奖励物体高度相对初始高度的增加，并在第一次越过 lifted threshold 时给一次 bonus。一旦 I_grasped 变成 1，乘子 1-I_grasped 会关闭后续 lift shaping。

第三项是 goal reward。对于当前目标，系统记录目前达到过的最小 pose distance d star，只奖励比历史最优值更进一步的进展；如果距离小于 epsilon，就给 success bonus，并采样下一个目标。外层的 I_grasped 表示只有完成首次抓取与抬起后，位姿跟踪 reward 才生效。

这里的 pose distance 用四个固定尺度 keypoints 构造：分别计算当前工具与目标工具四个对应点的欧氏误差，取最大值。keypoint 尺度是 14×3×3 厘米，因此位置和平移误差被统一进同一个度量，对 pitch 和 yaw 比对沿工具长轴的 roll 更敏感。

这套设计的逻辑是：先让动作平滑，再塑造接近和抬起，最后才持续推动工具到达目标。progress-based reward 只奖励“比之前更好”，避免机器人停在目标附近反复刷取同一份 shaping reward。

**操作提示：** 共四次揭示：1 smooth；2 grasp；3 goal 和 pose distance；4 最下方 reward 与 actor–critic objective 的区别。

## 11. LSTM 用历史信息补足部分可观测性

**对应英文标题：** LSTM memory carries interaction history across steps

**建议时间：** 约 150 秒

先沿时间轴从左到右看。在时刻 t，同一个 LSTM 接收当前 feature vector x_t、上一时刻 hidden state h_{t-1} 和 cell state c_{t-1}，然后产生更新后的 h_t、c_t。action MLP 读取 h_t，输出当前 29 维动作 a_t。图中三个时间步共享同一套网络参数，并不是三套独立策略。

这里简单补充 x_t 的含义，不再单独用一页展开。它包括机器人 proprioception 和上一步 joint target，以及工具朝向、相对掌心的 keypoints、当前目标的 keypoint error 和 grasp-region box 尺寸。actor 不直接接收完整 mesh、显式质量、惯量或 privileged object velocity。

Cell state c_t 是内部记忆通道。标准 LSTM 更新可以写成 c_t=f_t⊙c_{t-1}+i_t⊙c̃_t。Forget gate f_t 决定旧记忆保留多少，input gate i_t 决定把多少候选信息写入记忆。这里保存的不是过去 observation 的原始副本，而是网络学习到的历史摘要。

Hidden state h_t 是当前暴露出来的表示，可以写成 h_t=o_t⊙tanh(c_t)。Output gate o_t 决定 cell state 中哪些信息在当前时刻用于决策。h_t 一方面送入 action MLP，另一方面参与下一时刻 gate 的计算。因此 h 和 c 都包含历史，但 c 更接近内部记忆，h 更接近当前可用于输出动作的工作表示。

论文配置中两种 state 都是 1,024 维。后面的 MLP hidden widths 是 1,024、1,024、512、512，最后得到 29 维输出。模型使用 layer normalization，MLP 使用 ELU。上一时刻 joint-position target 还会作为显式 observation 输入。

为什么需要这种 memory？单帧没有直接给出工具质量、惯量、接触稳定性和完整速度。策略可以结合此前执行的动作和工具响应，形成对潜在几何与动力学的隐式适应。但这只是一种机制解释，论文没有证明某个 hidden unit 明确编码了质量。页面中的 gate 公式属于标准 LSTM，也不是本文提出的新结构。

**操作提示：** 前两次前进键展开 t 和 t+1；第三次解释 cell state；第四次解释 hidden state；第五次强调它们是历史摘要，而不是原始历史帧堆叠。

## 12. Action Head 对手臂与手指采用不同控制方式

**对应英文标题：** The action head controls the arm and hand differently

**建议时间：** 约 120 秒

策略输出 29 维动作，范围先裁剪到负一到一。前 7 维对应机械臂，采用 incremental joint targets：在上一时刻目标上加 0.025 倍动作，所以每一步只做小幅调整。后 22 维对应 Allegro Hand，采用 absolute joint targets：把动作线性映射到每个关节的合法范围。

两路目标还会经过 alpha 等于 0.1 的 EMA smoothing，再以 60 Hz 发送到底层控制。更细节地说，手臂 target 在平滑前裁剪，手部 target 在平滑后裁剪。

这里还要区分两种“更新”：真实部署时 LSTM 的 hidden/cell state 会在每个控制步更新，这是在线反馈的一部分；但网络权重保持冻结，没有 test-time fine-tuning。

**操作提示：** 先比较 incremental 与 absolute target，再揭示 EMA 和 fixed weights。

## 13. 仿真效果：到达多样工具位姿

**对应英文标题：** Simulation: reaching diverse tool poses

**建议时间：** 约 90 秒

现在看一段自动循环的仿真 GIF。绿色 mesh 表示当前目标位姿，而不是第二个实体工具。请大家重点观察两点：第一，策略需要先获取工具，再逐渐调整手指与工具之间的相对关系；第二，目标变化以后，它会继续完成新的 reorientation，而不是只学会一个固定抓取姿态。

这段视频说明训练环境和策略行为长什么样，但它本身不是泛化能力或训练效率的定量证据。再次强调，这个训练 loop 中没有人类任务轨迹。

**操作提示：** Training GIF 会自动循环；在明显的手内调整阶段提示听众重点观察。

## 14. 从仿真到现实：Ground Truth 变成状态估计

**对应英文标题：** Simulation exposes the state. Reality requires estimation.

**建议时间：** 约 75 秒

到这里，仿真中的问题已经解决了一半：如果我们能够获得工具当前位姿、几何描述和目标位姿，actor 就可以闭环控制。但真实世界并不会直接返回这些 ground truth。工具可能被遮挡，位姿隐藏在 RGB-D 图像中，新工具的几何也未知。

因此 sim-to-real 的核心过渡是：保持 motor policy 不变，用感知系统把真实世界重新转换成同一个 policy interface。同时，随机目标要被替换成真正有任务意义的目标序列，这一部分由人类演示提供。

**操作提示：** 先讲 simulator 一侧，再 reveal real robot 一侧与底部过渡句。

## 15. 真实部署 Pipeline：向固定策略提供同样的接口

**对应英文标题：** Real deployment supplies the same policy interface

**建议时间：** 约 120 秒

真实部署分 setup 和 online execution 两部分。setup 阶段，人类先做一次 RGB-D 演示。用户通过 point prompts 标出工具以及 handle/head 区域；SAM 2 做分割，SAM 3D 结合深度恢复 metric mesh 与 grasp box。FoundationPose 在演示视频中跟踪 mesh，从而提取工具目标轨迹。

执行阶段，新的 RGB-D 流和同一个 mesh 用于实时估计当前工具位姿。固定 actor 接收 proprioception、当前工具位姿、grasp box 和当前 goal，输出关节目标，形成物理闭环。

有两个边界需要讲清楚。第一，mesh 主要服务于 perception，不是直接送进 actor；actor 使用的是压缩后的 object-centric features。第二，这个 pipeline 不包含目标工具上的 policy training。所谓 zero-shot 指 policy transfer，不代表没有演示、没有用户 prompt、没有标定，也不代表完全自动化。

**操作提示：** 按 setup、goal extraction、online tracking、fixed actor 的顺序走完整张图。

## 16. 目标切换由到达事件触发，而不是按演示时钟播放

**对应英文标题：** The robot advances goals only after reaching them

**建议时间：** 约 90 秒

人类演示原始轨迹是 30 Hz，作者将其下采样为 3 Hz waypoint，并去掉抓取前静止的部分。真实执行时，FoundationPose 以 30 Hz 更新工具 pose，机器人 policy 以 60 Hz 控制。

3 Hz 容易被误解为“机器人每三分之一秒强制切换目标”。实际上不是。只有当前工具到目标的 keypoint error 小于 threshold，系统才推进到下一个 waypoint。所以演示给出的是空间路径，执行是 event-driven 的；困难的某一步可以花得比人更久。

这也解释了为什么这种接口能弱化人和机器人的速度差异，但它仍然依赖预先给定、顺序固定的目标序列。

**操作提示：** 依次揭示三个频率，最后强调 goal switching 的触发条件。

## 17. 闭环策略跟随未见过的工具轨迹

**对应英文标题：** The closed loop follows unseen tool trajectories

**建议时间：** 约 90 秒

这段自动循环的 inference GIF 把人类演示、提取的目标位姿和真实机器人执行放在一起。人类规定工具运动，而机器人没有复制人的指关节轨迹；固定策略根据自己当前的工具状态，决定怎样抓取、调整和移动。

这里“unseen”或者“zero-shot”的含义，是这段目标轨迹和这件真实工具没有用于重新训练 policy。它不表示完全没有人类演示，也不表示感知模块不需要为工具做 setup。大家可以把视频与上一页的 event-driven switching 联系起来看：目标是按到达状态推进的，而不是按原视频时间轴硬播放。

**操作提示：** Inference GIF 会自动循环；依次指向人类演示、goal visualization 与 robot execution 三部分。

## 18. 刷子与锤子：先调整工具，再执行交互

**对应英文标题：** Brush and hammer: reorientation before interaction

**建议时间：** 约 90 秒

接下来三页主要看真实世界行为，数据表只保留一页。刷子和锤子的共同点是，在真正扫动或挥动之前，都需要先建立稳定抓取并改变工具相对手掌的朝向。

两个 GIF 会并排自动循环。观察手指是否在工具转动过程中改变接触，以及手腕运动和手内调整如何配合。锤子 GIF 能够说明 pose-control 行为，但不能仅凭 montage 推断冲击力是否准确；刷子 GIF 同样不能单独代表整体成功率。这些都是作者挑选的定性展示。

**操作提示：** 对照观察 Brush 与 Hammer，重点比较抓取建立和姿态调整过程。

## 19. 马克笔与橡皮：沿表面执行工具轨迹

**对应英文标题：** Marker and eraser: tool motion along a surface

**建议时间：** 约 90 秒

马克笔和橡皮都需要沿表面运动，但几何和接触条件不同。马克笔细，tip placement 更敏感；橡皮的接触区域更大，擦拭路径相对宽容。同一个 actor 通过工具位姿和 grasp-region interface 处理这两类对象。

需要注意，policy 没有显式表示“墨水写出来没有”或者“字擦干净没有”。视觉上能看到书写与擦拭行为，但论文的统一指标仍是完成了多少 sequential pose goals，而不是功能结果的直接测量。

**操作提示：** 两个 GIF 会并排自动循环；让听众比较 tip-sensitive 与 area-contact 两种情况。

## 20. 铲子与螺丝刀：更大的姿态变化

**对应英文标题：** Spatula and screwdriver: larger orientation changes

**建议时间：** 约 90 秒

铲子和螺丝刀更突出 orientation control。铲取、翻转和装盘动作会经历较大的姿态变化；螺丝刀任务要求在自由空间重定向并旋转工具。

这里必须准确描述任务范围：论文中的 screwdriver benchmark 是 free-space spinning，不是把螺丝拧入工件，也没有评价扭矩。螺丝刀的近轴对称几何还会增加视觉 pose tracking 的歧义。这些例子既说明紧凑 6D pose interface 的能力，也说明它对力敏感功能任务的覆盖仍有限。

**操作提示：** 两个 GIF 会并排自动循环；明确 screwdriver 展示的是 free-space spinning，而不是 fastening。

## 21. 六类工具上的真实世界迁移

**对应英文标题：** Real-world transfer across six tool categories

**建议时间：** 约 90 秒

定量结果集中在这一页。DexToolBench 包含六类工具，每类两个 instance、两条 trajectory，每个 object-task variation 做五次 rollout，总计 120 次。

论文的 Task Progress 定义为按顺序到达的目标位姿比例。这里的柱状图是从 Table II 的所有 rollout 重新计算的 category mean，总体均值约 79.3%。eraser 相对容易，因为手内旋转需求较少；screwdriver 更难，需要较大 reorientation 和持续旋转。

最重要的解释边界是：79.3% 不是 79.3% 的任务完整成功率，更不是所有工具的功能成功率。它描述的是 pose trajectory progress。这个统一指标适合比较类别，但不会直接衡量刷得干不干净、锤击力是否足够或者是否真的拧紧螺丝。

**操作提示：** 简要读总体和趋势，不逐项念每个数字。

## 22. 恢复行为体现反馈能力，也暴露边界

**对应英文标题：** Recovery illustrates feedback, with clear limits

**建议时间：** 约 90 秒

这段自动循环的 recovery GIF 说明 recurrent closed-loop policy 在发生误差后有时会尝试重新抓取。它不是只按预先录好的 open-loop action sequence 播放，而会根据当前状态继续控制。

但这个结论需要保持条件化：工具必须仍在可达范围内，而且视觉跟踪仍然可靠。训练中 drop 后会 reset，因此视频中的恢复不能等同于系统性鲁棒性评估。方法也没有显式的障碍物规划、功能接触力控制或高层任务 replanning；刚性工具假设和固定目标序列仍然限制了适用范围。

**操作提示：** Recovery GIF 会自动循环；观察一次恢复过程后，将注意力转向三条限制。

## 23. 由该方法引出的三个研究方向

**对应英文标题：** Three research directions suggested by the method

**建议时间：** 约 180 秒

下面三点是我基于论文的延伸思考，不是作者已经验证的结果。

第一，这种路线可能是大规模端到端 action model 之外的一条互补路径：用结构化仿真 RL 先训练稳定、可复用的低层 motor skill，再让更高层系统负责选择工具和生成目标。但 SimToolReal 还不能支持“机器人在野外自主学会新技能”这一强结论，因为它仍需要人工设计的接口、演示和感知 setup。

第二，真正可迁移的思想也许不是“所有任务都变成 6D pose”，而是寻找一个足够紧凑、又保留任务必要信息的 interface。刚性工具适合 SE(3) pose；但门、绳子、布料、液体或 force-critical tasks 可能还需要 articulation、shape、contact 和 force state。

第三，可以考虑用轻量级 VLM 减少人工 semantic setup，例如自动选择工具、grasp region，或者从语言与视频中提出 subgoals。但 VLM 不能仅凭语义替代 metric tracking。进入控制闭环后仍然需要厘米级误差、低延迟和明确的失败检测。

一个可执行的后续实验是保持 actor 完全冻结，只把人工 prompt 替换为 VLM 的区域与子目标建议，然后同时测 setup 时间、pose error、failure recovery 和真正的 functional completion。

**操作提示：** 三点依次揭示；开头先提醒这是 presenter hypotheses。

## 24. 总结：结构化仿真可能是获得通用机器人技能的另一条路径

**对应英文标题：** Structured simulation as a route to reusable robot skills

**建议时间：** 约 75 秒

最后不再重复前面已经讲过的方法细节，只保留一个更概括的个人思考。

当前很多工作尝试通过扩大端到端 action model、增加真实机器人数据，让一个大模型覆盖更多任务。SimToolReal 提示了另一条可能的路线：先在结构化仿真中学习稳定、可复用的底层 motor competence，再让 perception、human demonstration 或更高层模型负责给出 object-level goals。也就是说，底层策略负责“怎样把动作做出来”，上层系统负责“工具接下来应该去哪里”。

这种分工也许能够减少每个新任务都重新收集大量机器人动作数据的需求，并成为机器人在开放环境中获得技能的一部分。不过这里必须保留边界：SimToolReal 只验证了可迁移 motor controller，还没有解决机器人怎样自主发现任务、生成目标或者设计 reward。因此这一页表达的是由论文引出的研究判断，不是论文已经证明的最终结论。

**操作提示：** 用这一个观点收束汇报，不再逐条回顾 pipeline、SAPG 或 LSTM。

## 25. 备份：论文、项目视频与相关工作

**对应英文标题：** References, videos and source material

**建议时间：** 约 20 秒（按需）

这一页汇总主论文、RSS proceedings、项目主页、代码，以及几篇直接相关的 object-centric dexterous manipulation 工作。Slides 中的论文图和项目视频保留原始作者归属；自行绘制的 pipeline 和示意图用于讲解。真实世界柱状图来自论文 Table II 的逐 rollout 数据重算。

如果后续要复现或继续修改，建议先从论文 Appendix A、C、E，以及官方代码中的 LSTM asymmetric PPO 配置开始核对。

**操作提示：** 作为来源页保留，不需要在正常汇报中停留。
