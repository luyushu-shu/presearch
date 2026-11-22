import {
  BarChart,
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Code,
  CollapsibleSection,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Link,
  Pill,
  Row,
  Spacer,
  Stack,
  Stat,
  Swatch,
  Table,
  Text,
  TextInput,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type PillarId =
  | "all"
  | "localization"
  | "smarthome"
  | "wakefree"
  | "timing"
  | "omnicam"
  | "minutes";
type EraId = "all" | "milestone" | "recent";

interface PaperEntry {
  id: string;
  shortName: string;
  title: string;
  authorsVenue: string;
  year: number;
  era: "milestone" | "recent";
  pillar: Exclude<PillarId, "all">;
  arxivId?: string;
  url: string;
  urlLabel: string;
  coreContribution: string;
  keyMetric: string;
  designImplication: string;
}

const PILLAR_META: Record<
  Exclude<PillarId, "all">,
  {
    label: string;
    shortLabel: string;
    swatch: "cyan" | "yellow" | "blue" | "orange" | "purple" | "green";
  }
> = {
  localization: {
    label: "1. 摄像头 + 移动设备全屋人物定位与追踪",
    shortLabel: "全屋人物房间定位",
    swatch: "cyan",
  },
  smarthome: {
    label: "2. 后 HA 时代全屋空间多模态 Agent 架构",
    shortLabel: "全屋空间 Agent 底座",
    swatch: "yellow",
  },
  wakefree: {
    label: "3. 无唤醒词指向检测与全双工轮次",
    shortLabel: "无唤醒词 & 全双工",
    swatch: "blue",
  },
  timing: {
    label: "4. 主动介入时机与打断代价门控",
    shortLabel: "介入时机门控",
    swatch: "orange",
  },
  omnicam: {
    label: "5. 摄像头 + 音频流式主动交互模型",
    shortLabel: "音视频流式交互",
    swatch: "purple",
  },
  minutes: {
    label: "6. 实时多人转写、声纹日志与家庭备忘纪要",
    shortLabel: "实时转写 & 家庭纪要",
    swatch: "green",
  },
};

const PAPERS: PaperEntry[] = [
  // Pillar 1: Camera + Mobile Multi-Modal Indoor Person Localization
  {
    id: "radar-2000",
    shortName: "RADAR",
    title: "RADAR: An In-Building RF-based User Location and Tracking System",
    authorsVenue: "Bahl & Padmanabhan (MSR) · INFOCOM 2000",
    year: 2000,
    era: "milestone",
    pillar: "localization",
    url: "https://www.microsoft.com/en-us/research/publication/radar-an-in-building-rf-based-user-location-and-tracking-system/",
    urlLabel: "MSR INFOCOM 00",
    coreContribution:
      "室内无线定位开山鼻祖：首次提出利用室内基站接收信号强度（RSSI）构建无线电指纹地图并结合信号传播模型定位建筑内用户位置。",
    keyMetric: "室内中位定位误差 2–3 米（房间级定位基石）",
    designImplication:
      "奠定了手机 Wi-Fi/BLE 房间级定位的基本范式，但也暴露了多径效应与家具遮挡痛点。",
  },
  {
    id: "vificon-2022",
    shortName: "ViFiCon & ViFiT",
    title: "ViFiCon: Vision and Wireless Association Via Self-Supervised Contrastive Learning",
    authorsVenue: "Cao, Dana, Gruteser et al. (Rutgers) · 2022–2023",
    year: 2022,
    era: "milestone",
    pillar: "localization",
    arxivId: "2210.05513",
    url: "https://www.alphaxiv.org/abs/2210.05513",
    urlLabel: "alphaXiv:2210.05513",
    coreContribution:
      "摄像头与手机无线跨模态身份关联奠基之作：用自监督对比学习将画面中的人体检测框与智能手机 Wi-Fi FTM/IMU 轨迹匹配，并在走出视野后由 ViFiT (2310.03140) 重构轨迹。",
    keyMetric: "2.5 秒滑窗内“视觉人框 <-> 手机”关联准确率 92.63%",
    designImplication:
      "直接解决“画面里的人背对镜头看不清脸，如何知道他是哪部手机的主人”这一核心问题。",
  },
  {
    id: "multires-survey-2023",
    shortName: "Multi-Resident Tracking & UMTF",
    title: "A Survey on Multi-Resident Activity Recognition in Smart Environments & UMTF",
    authorsVenue: "alphaXiv 2304.12304 & 2110.15610",
    year: 2023,
    era: "milestone",
    pillar: "localization",
    arxivId: "2304.12304",
    url: "https://www.alphaxiv.org/abs/2304.12304",
    urlLabel: "alphaXiv:2304.12304",
    coreContribution:
      "系统确立多住户智能家居头号难题为 Data Association（传感器事件与成员身份关联）；UMTF (2110.15610) 进一步证明仅需粗略相机位置即可用无线轨迹辅助跨相机 Re-ID。",
    keyMetric: "无需全屋密集标定即可完成跨摄像头+无线联合身份传播",
    designImplication:
      "明确了你的自研定位模块本质是一个“多源证据（视觉/手机/声纹）到家庭成员 ID 的持续数据关联器”。",
  },
  {
    id: "corvs-plus-2025",
    shortName: "CorVS+",
    title: "CorVS+: Correspondence-Driven Association of Video Trajectories and Sensors for Identity-Aware Person Localization",
    authorsVenue: "alphaXiv Preprint · Oct 2025",
    year: 2025,
    era: "recent",
    pillar: "localization",
    arxivId: "2510.26369",
    url: "https://www.alphaxiv.org/abs/2510.26369",
    urlLabel: "alphaXiv:2510.26369",
    coreContribution:
      "针对固定摄像头与随身手机传感器在多人静止/遮挡下的匹配失效，同时预测每对“视觉轨迹-手机传感器”的对应概率与可靠度权重，沿时间轴做全局图匹配。",
    keyMetric: "复杂室内多人身份定位 F1 从传统步态匹配 0.131 跃升至 0.761",
    designImplication:
      "其“可靠度预测”思想可直接用来识别并降权“手机放在桌上静止（人机分离）”的失效时段！",
  },
  {
    id: "calibfree-mcpt-2026",
    shortName: "Calibration-Free 3D MCPT & SCOUT",
    title: "Calibration-Free 3D Multi-Camera People Tracking for Indoor Environment",
    authorsVenue: "alphaXiv Jul 2026 (2607.22731) & SCOUT Jul 2025 (2507.08494)",
    year: 2026,
    era: "recent",
    pillar: "localization",
    arxivId: "2607.22731",
    url: "https://www.alphaxiv.org/abs/2607.22731",
    urlLabel: "alphaXiv:2607.22731",
    coreContribution:
      "利用视觉几何基础模型 VGGT 直接从多路室内监控画面恢复统一 3D 空间与人体头肩位置，免除繁琐棋盘格相机标定；SCOUT (2507.08494) 则把墙体遮挡先验编入动态 GNN。",
    keyMetric: "零人工外参标定实现多相机 3D 跨视角身份追踪",
    designImplication:
      "自研家庭系统极度友好：家里装摄像头或挪位置无需专业标定，靠 VGGT 即可自动建立全屋统一几何坐标系。",
  },
  {
    id: "vision-cal-wifi-2025",
    shortName: "Vision-Assisted RF Calibration & LoFi",
    title: "Scalable Wi-Fi RSS-Based Indoor Localization via Automatic Vision-Assisted Calibration",
    authorsVenue: "alphaXiv Sep 2025 (2509.22869) & LoFi (2412.05074)",
    year: 2025,
    era: "recent",
    pillar: "localization",
    arxivId: "2509.22869",
    url: "https://www.alphaxiv.org/abs/2509.22869",
    urlLabel: "alphaXiv:2509.22869",
    coreContribution:
      "用摄像头视觉定位自动为家中手机接收到的多信道 Wi-Fi/BLE RSSI 数据打高精度真值标签，全自动训练适配当前户型的移动端定位模型。",
    keyMetric: "免除人工逐房间采集指纹，跨设备与复杂多径泛化显著提升",
    designImplication:
      "绝妙落地技巧：平时人揣着手机在客厅走廊走动时，摄像头自动帮手机校准无线指纹库，进了无摄像头房间也能准确定位。",
  },
  {
    id: "dasel-wifi-home-2026",
    shortName: "DASEL BLE & Million-Home WiFi",
    title: "Deep Attention-based Sequential BLE Localization & Scaling WiFi Sensing in Homes",
    authorsVenue: "alphaXiv Mar 2026 (2603.21030) & 2506.04322",
    year: 2026,
    era: "recent",
    pillar: "localization",
    arxivId: "2603.21030",
    url: "https://www.alphaxiv.org/abs/2603.21030",
    urlLabel: "alphaXiv:2603.21030",
    coreContribution:
      "DASEL 将 BLE 定位建模为置信度加权的双向注意力序列轨迹学习；2506.04322 总结真实家庭边缘无线感知过滤宠物与扫地机器人误触发的运动学特征。",
    keyMetric: "BLE 序列建模 F1 +53.1%；宠物/扫地机误报从 63.1% 压至 8.4%",
    designImplication:
      "处理 BLE 信号穿墙跳变（防房间闪跳）与家里猫狗/扫地机干扰的直接工程参考。",
  },

  // Pillar 2: Post-Home-Assistant Multimodal Smart Home Agent Architecture
  {
    id: "sasha-2024",
    shortName: "Sasha",
    title: "Sasha: Creative Goal-Oriented Reasoning in Smart Homes with Large Language Models",
    authorsVenue: "King et al. (UT Austin) · IMWUT 2024",
    year: 2024,
    era: "milestone",
    pillar: "smarthome",
    arxivId: "2305.09802",
    url: "https://www.alphaxiv.org/abs/2305.09802",
    urlLabel: "alphaXiv:2305.09802",
    coreContribution:
      "LLM 替代传统 IFTTT / Home Assistant 死板规则的里程碑：将“让屋里舒服点”等模糊目标拆解为澄清、设备过滤、规划、执行与反馈五阶段，并归纳七大失效模式。",
    keyMetric: "首次系统量化 LLM 生成家居动作计划与持久自动化规则的边界",
    designImplication:
      "解释了为什么不能把全部设备 JSON 直接塞给大模型，必须先按房间和人物上下文做设备子集过滤。",
  },
  {
    id: "lahar-2024",
    shortName: "LAHAR",
    title: "Towards LLM-Powered Ambient Sensor Based Multi-Person Human Activity Recognition",
    authorsVenue: "alphaXiv Preprint · Jul 2024",
    year: 2024,
    era: "milestone",
    pillar: "smarthome",
    arxivId: "2407.09529",
    url: "https://www.alphaxiv.org/abs/2407.09529",
    urlLabel: "alphaXiv:2407.09529",
    coreContribution:
      "将房屋户型图（House Layout）、房间连通性与成员日程先验编码进结构化推理，把交织的多住户环境事件拆解归属到每个家庭成员的活动时间线。",
    keyMetric: "双住户真实家庭 ARAS 数据集秒级活动识别加权 F1 86.5%–91.9%",
    designImplication:
      "验证了“户型连通图 + 历史状态摘要”是对抗家庭部分可观测（盲区）的强力约束。",
  },
  {
    id: "omnismarthome-2026",
    shortName: "OmniSmartHome & PROME",
    title: "OmniSmartHome: A Multimodal Reasoning Benchmark for Smart-Home Agents",
    authorsVenue: "alphaXiv Preprint · Sep 2026",
    year: 2026,
    era: "recent",
    pillar: "smarthome",
    arxivId: "2609.32569",
    url: "https://www.alphaxiv.org/abs/2609.32569",
    urlLabel: "alphaXiv:2609.32569",
    coreContribution:
      "直击家庭自然语音的五大空间省略指代（手势、设备异响定位、说话人朝向、说话人身份与“我房间”归属），提出带人脸/声纹/头姿/声源工具链与程序记忆的 PROME 架构。",
    keyMetric: "1,632 个视听空间语境家庭任务；PROME 显著提升跨模态指代消歧",
    designImplication:
      "完美印证你的双方向协同：没有“谁在哪间房 + 朝哪看”，全时语音助理根本听不懂“把这儿关了”。",
  },
  {
    id: "hearthnet-2026",
    shortName: "HearthNet",
    title: "HearthNet: Edge Multi-Agent Orchestration for Smart Homes",
    authorsVenue: "alphaXiv Preprint · Apr 2026",
    year: 2026,
    era: "recent",
    pillar: "smarthome",
    arxivId: "2604.09618",
    url: "https://www.alphaxiv.org/abs/2604.09618",
    urlLabel: "alphaXiv:2604.09618",
    coreContribution:
      "面向本地边缘硬件与 Android 终端的自研智能家居多智能体编排底座：基于共享状态与 MQTT，将规划、校验、权限鉴权与设备执行租约（Actuation Leases）严格分层。",
    keyMetric: "全本地状态管理与权限隔离，杜绝大模型并发冲突与越权误控",
    designImplication:
      "重做替代 Home Assistant 时的最佳工程参考：特别是“执行租约”可防止自动化与语音指令打架。",
  },
  {
    id: "personalhomebench-2026",
    shortName: "PersonalHomeBench & SMH-Bench",
    title: "PersonalHomeBench: Evaluating Agents in Personalized Smart Homes",
    authorsVenue: "alphaXiv Apr 2026 (2604.16813) & SMH-Bench Jun 2026 (2606.01912)",
    year: 2026,
    era: "recent",
    pillar: "smarthome",
    arxivId: "2604.16813",
    url: "https://www.alphaxiv.org/abs/2604.16813",
    urlLabel: "alphaXiv:2604.16813",
    coreContribution:
      "在部分可观测的多房间个性化家庭中评测被动控制与主动推荐，设计了“家庭实时状态维护器（Transcriber）+ 历史记忆检索器 + 视频按需取证”三工具协同架构。",
    keyMetric: "揭示单纯开启 CoT 慢思考无效，工具化状态追踪才是准确率关键",
    designImplication:
      "架构定心丸：你的后台应该有一个常驻 World-State Transcriber 持续把音视频消化成结构化家庭状态表。",
  },

  // Pillar 3: Wake-word-free, Addressee Detection & Full-Duplex
  {
    id: "bohus-2009",
    shortName: "Multiparty Engagement",
    title: "Models for Multiparty Engagement in Open-World Dialog",
    authorsVenue: "Bohus & Horvitz · SIGDIAL / ICMI 2009",
    year: 2009,
    era: "milestone",
    pillar: "wakefree",
    url: "https://aclanthology.org/W09-3933.pdf",
    urlLabel: "ACL W09-3933",
    coreContribution:
      "开放世界多方对话开山之作：用广角摄像头（人脸、头部姿态、F-formation 站位）配合麦克风阵列声源定位代替唤醒词，显式建模 Engagement 状态、动作与意图。",
    keyMetric: "摄像头 + 4麦阵列实时追踪多人参与意图",
    designImplication:
      "确立了“视觉姿态定指向、音频定话轮”的经典范式，非常适合客厅等多成员共处空间。",
  },
  {
    id: "mallidi-2018",
    shortName: "Alexa Follow-Up DDSD",
    title: "Device-directed Utterance Detection",
    authorsVenue: "Mallidi et al. (Amazon) · Interspeech 2018",
    year: 2018,
    era: "milestone",
    pillar: "wakefree",
    arxivId: "1808.02504",
    url: "https://www.alphaxiv.org/abs/1808.02504",
    urlLabel: "alphaXiv:1808.02504",
    coreContribution:
      "工业界无唤醒词连续对话（Follow-Up Mode）里程碑：融合声学 LSTM、ASR 解码器置信特征与文本语义，区分对设备指令与家人闲聊。",
    keyMetric: "多特征融合 EER 5.2%（相对下降 44%）",
    designImplication:
      "证明无唤醒词不能只看转写文本，必须保留声学韵律与解码不确定性特征。",
  },
  {
    id: "vap-2022",
    shortName: "VAP (Turn-Taking)",
    title: "Voice Activity Projection: Self-supervised Learning of Turn-taking Events",
    authorsVenue: "Ekstedt & Skantze · SIGDIAL 2022",
    year: 2022,
    era: "milestone",
    pillar: "wakefree",
    arxivId: "2205.09812",
    url: "https://www.alphaxiv.org/abs/2205.09812",
    urlLabel: "alphaXiv:2205.09812",
    coreContribution:
      "神经话轮预测基石：通过自监督预测未来双通道语音活动分布，零样本统一处理话轮交接（Shift/Hold）与短附和（Backchannel）预测。",
    keyMetric: "Switchboard 零样本 S-pred / BC-pred 全面领先",
    designImplication:
      "可作为极轻量级音频侧话轮检测器，避免全时助理在家人说话喘气停顿时抢话。",
  },
  {
    id: "moshi-2024",
    shortName: "Moshi",
    title: "Moshi: a speech-text foundation model for real-time dialogue",
    authorsVenue: "Défossez et al. (Kyutai) · arXiv 2024",
    year: 2024,
    era: "milestone",
    pillar: "wakefree",
    arxivId: "2410.00037",
    url: "https://www.alphaxiv.org/abs/2410.00037",
    urlLabel: "alphaXiv:2410.00037",
    coreContribution:
      "首个实时全双工原生语音大模型里程碑：并行建模用户与系统双音频流，引入时间对齐文本前缀 Inner Monologue，支持随时打断与重叠语音。",
    keyMetric: "理论延迟 160 ms，实测端到端延迟 ~200 ms",
    designImplication:
      "展示了全双工“边听边说”底座形态，但在家庭多人房间需前置指向门控。",
  },
  {
    id: "sas-2026",
    shortName: "SAS (Audio+Video DDSD)",
    title: "Selective Attention System (SAS): Device-Addressed Speech Detection for Real-Time On-Device Voice AI",
    authorsVenue: "alphaXiv Preprint · Apr 2026",
    year: 2026,
    era: "recent",
    pillar: "wakefree",
    arxivId: "2604.08412",
    url: "https://www.alphaxiv.org/abs/2604.08412",
    urlLabel: "alphaXiv:2604.08412",
    coreContribution:
      "将预转写（Pre-ASR）无唤醒词指向检测建模为基于交互历史的序列路由问题（SDAR），支持可选摄像头与音频融合，端侧 ARM 芯片直接运行。",
    keyMetric: "纯音频 F1 0.86 -> 摄像头+音频 F1 0.95；<150 ms，<20 MB",
    designImplication:
      "客厅等有摄像头房间走音视频融合（Precision 0.97），卧室无摄像头房间自动退化为纯音频+历史模式（F1 0.86）！",
  },
  {
    id: "avdialog-2025",
    shortName: "AV-Dialog",
    title: "AV-Dialog: Spoken Dialogue Models with Audio-Visual Input",
    authorsVenue: "alphaXiv Preprint · Nov 2025",
    year: 2025,
    era: "recent",
    pillar: "wakefree",
    arxivId: "2511.11124",
    url: "https://www.alphaxiv.org/abs/2511.11124",
    urlLabel: "alphaXiv:2511.11124",
    coreContribution:
      "结合人脸检测、AV-HuBERT 唇动特征与保留说话人声学特征的 DAC 音频编码，在电视背景音或家人交谈干扰下锁定目标说话人。",
    keyMetric: "强噪声多人干扰下转写与话轮边界显著优于纯语音模型",
    designImplication:
      "解决客厅开着电视/投影仪时全时语音助理最头疼的影视人声误触发问题。",
  },
  {
    id: "epa-2026",
    shortName: "Endpoint Anticipation",
    title: "Endpoint Anticipation for Low-Latency Spoken Dialogue",
    authorsVenue: "alphaXiv Preprint · Jun 2026",
    year: 2026,
    era: "recent",
    pillar: "wakefree",
    arxivId: "2606.13450",
    url: "https://www.alphaxiv.org/abs/2606.13450",
    urlLabel: "alphaXiv:2606.13450",
    coreContribution:
      "提前 320–2560 ms 预测用户话轮即将结束，配合 Trigger & Fork 投机执行提前启动 LLM 与 TTS 缓存，一旦确认停顿立即播报。",
    keyMetric: "平均减少 505 ms 响应延迟，投机算力开销仅 +28.4%",
    designImplication:
      "让自研级联架构（流式 ASR -> 家居 Agent -> TTS）也能拥有媲美原生语音模型的秒回体感。",
  },
  {
    id: "duplex-mpe-2026",
    shortName: "Duplex-MPE",
    title: "Duplex-MPE: Benchmarking Multi-Party Interaction in Full-Duplex Dialogue",
    authorsVenue: "alphaXiv Preprint · Sep 2026",
    year: 2026,
    era: "recent",
    pillar: "wakefree",
    arxivId: "2609.31948",
    url: "https://www.alphaxiv.org/abs/2609.31948",
    urlLabel: "alphaXiv:2609.31948",
    coreContribution:
      "针对 3–4 名人类与 1 名 AI 助手的多方全双工评测集（2,000 场景），成对考察显式与隐式指向下助手“回答 / 保持沉默 / 立即停说”的决策。",
    keyMetric: "2,000 多人显/隐式指向配对测试场景",
    designImplication:
      "直接对应一家三四口在餐桌聊天时，全时语音助理的社交分寸感测试。",
  },

  // Pillar 4: Proactive Intervention Timing & Cost Gating
  {
    id: "horvitz-1999",
    shortName: "Attention-Sensitive Alerting",
    title: "Attention-Sensitive Alerting / Principles of Mixed-Initiative User Interfaces",
    authorsVenue: "Horvitz, Jacobs & Hovel · UAI 1999 & CHI 1999",
    year: 1999,
    era: "milestone",
    pillar: "timing",
    arxivId: "1301.6707",
    url: "https://www.alphaxiv.org/abs/1301.6707",
    urlLabel: "alphaXiv:1301.6707",
    coreContribution:
      "主动交互决策理论原点：利用贝叶斯网络推断用户注意力状态，提出净期望价值准则 NEVA = EVTA - ECA > 0，将“推迟汇总”作为显式动作。",
    keyMetric: "信息紧急度推断与专家评分相关性 r = 0.90",
    designImplication:
      "结合房间定位：人在书房专注或卧室休息时打断代价 ECA 极高，自动切为静默备忘。",
  },
  {
    id: "proactive-agent-2024",
    shortName: "Proactive Agent",
    title: "Proactive Agent: Shifting LLM Agents from Reactive Responses to Active Assistance",
    authorsVenue: "Lu et al. (Tsinghua) · ICLR 2025",
    year: 2024,
    era: "milestone",
    pillar: "timing",
    arxivId: "2410.12361",
    url: "https://www.alphaxiv.org/abs/2410.12361",
    urlLabel: "alphaXiv:2410.12361",
    coreContribution:
      "LLM 时代主动智能体基石：构建 6,790 事件的 ProactiveBench 与人类接受度奖励模型（F1 91.8%），驱动模型无需指令主动发起协助。",
    keyMetric: "Agent F1 66.47%，但无代价约束下误报率 >50%",
    designImplication:
      "证明不能直接让 LLM 看家庭事件流自由发挥，否则每天会有几十次烦人误报。",
  },
  {
    id: "llamapie-2025",
    shortName: "LlamaPIE",
    title: "LLAMAPIE: Proactive In-Ear Conversation Assistants",
    authorsVenue: "Chen et al. · alphaXiv May 2025",
    year: 2025,
    era: "recent",
    pillar: "timing",
    arxivId: "2505.04066",
    url: "https://www.alphaxiv.org/abs/2505.04066",
    urlLabel: "alphaXiv:2505.04066",
    coreContribution:
      "后台持续监听真人对话的实时主动助手：提出小模型判定“何时介入（When）”+ 大模型结合用户知识库生成“超简短提示（What）”的双模型流水线。",
    keyMetric: "Apple Silicon 端侧实时运行，真人实验显著优于被动助手",
    designImplication:
      "家庭本地服务器（如 Mac mini / 家用 GPU 盒子）7x24 小时常驻运行的标准省算力架构。",
  },
  {
    id: "inner-thoughts-2025",
    shortName: "Inner Thoughts",
    title: "Proactive Conversational Agents with Inner Thoughts",
    authorsVenue: "CHI 2025 · alphaXiv Jan 2025",
    year: 2025,
    era: "recent",
    pillar: "timing",
    arxivId: "2501.00383",
    url: "https://www.alphaxiv.org/abs/2501.00383",
    urlLabel: "alphaXiv:2501.00383",
    coreContribution:
      "让 AI 在多人交谈旁维护平行的隐式“内心独白”（触发 -> 记忆检索 -> 快/慢想法 -> 8 维动机评分 -> 过阈值才开口）。",
    keyMetric: "多人对话实验显著提升插话恰当性与拟人自然度",
    designImplication:
      "未达开口阈值的想法直接落盘进“家庭每日纪要/待办池”，实现主动对话与后台纪要同源！",
  },
  {
    id: "prism-2026",
    shortName: "PRISM",
    title: "PRISM: Festina Lente Proactivity -- Risk-Sensitive, Uncertainty-Aware Deliberation for Proactive Agents",
    authorsVenue: "Fu et al. · alphaXiv Feb 2026",
    year: 2026,
    era: "recent",
    pillar: "timing",
    arxivId: "2602.01532",
    url: "https://www.alphaxiv.org/abs/2602.01532",
    urlLabel: "alphaXiv:2602.01532",
    coreContribution:
      "将介入决策形式化为非对称代价敏感门控（权衡误打断代价 C_FA 与漏帮代价 C_FN），仅在阈值边界模糊区调用慢思考反事实推理。",
    keyMetric: "ProactiveBench 误报率降至 22.94%，F1 升至 86.61%",
    designImplication:
      "可为每位家庭成员配置专属打扰阈值 C_FA/C_FN（如老人模式偏积极提醒、工作书房偏极度克制）。",
  },
  {
    id: "tgl-gate-2026",
    shortName: "TGL Trigger Gate",
    title: "Do Proactive Agents Need an LLM to Decide When to Act?",
    authorsVenue: "Liu et al. · alphaXiv May 2026",
    year: 2026,
    era: "recent",
    pillar: "timing",
    arxivId: "2605.30152",
    url: "https://www.alphaxiv.org/abs/2605.30152",
    urlLabel: "alphaXiv:2605.30152",
    coreContribution:
      "用时序图网络（TGL）把“人物-设备-动作-时间”建模为动态图，单次前向推理同时完成介入触发与相关上下文实体锚定。",
    keyMetric: "11.13 ms/event，~220 MiB；提速 4–83x，下游平均 +16.7 F1",
    designImplication:
      "你的“家庭成员位置变迁 + 家电状态 + 转写事件”天然就是一张异构时序图，极适合用 TGL 做总门控。",
  },

  // Pillar 5: Camera + Audio Streaming Multimodal Assistants
  {
    id: "videollm-online-2024",
    shortName: "VideoLLM-online (LIVE)",
    title: "VideoLLM-online: Online Video Large Language Model for Streaming Video",
    authorsVenue: "Chen et al. (Show Lab) · CVPR 2024",
    year: 2024,
    era: "milestone",
    pillar: "omnicam",
    arxivId: "2406.11816",
    url: "https://www.alphaxiv.org/abs/2406.11816",
    urlLabel: "alphaXiv:2406.11816",
    coreContribution:
      "流式视频主动对话里程碑：提出 LIVE 框架与 Streaming EOS 沉默目标，使模型在连续视频流上默认保持沉默、按需主动生成回复。",
    keyMetric: "连续视频流上实现 10–13.5 FPS 实时流式交互",
    designImplication:
      "处理家庭公共区摄像头连续流的经典底座思潮：绝大部分帧只更新状态不生成废话。",
  },
  {
    id: "roma-2026",
    shortName: "ROMA",
    title: "ROMA: Real-time Omni-Multimodal Assistant with Interactive Streaming Understanding",
    authorsVenue: "Tian et al. (CAS & Tsinghua) · alphaXiv Jan 2026",
    year: 2026,
    era: "recent",
    pillar: "omnicam",
    arxivId: "2601.10323",
    url: "https://www.alphaxiv.org/abs/2601.10323",
    urlLabel: "alphaXiv:2601.10323",
    coreContribution:
      "将离散视频帧与密集音频对齐为 1 秒同步多模态单元，并设计独立双层 MLP Speak Head 将“触发开口决策”与“语言生成”彻底解耦。",
    keyMetric: "12 项基准测试中主动预警（StreamingBench PO 53.6）全面 SOTA",
    designImplication:
      "同时覆盖“用户随口问家里情况（Reactive QA）”和“发现灶台没关/快递到了主动提醒（Proactive Alert）”。",
  },
  {
    id: "egosocial-2025",
    shortName: "EgoSocial & DIVE",
    title: "EgoSocial (2510.13105) & DIVE: Full-Duplex Interaction with Visual Engagement (2610.28405)",
    authorsVenue: "alphaXiv Oct 2025 & Oct 2026",
    year: 2026,
    era: "recent",
    pillar: "omnicam",
    arxivId: "2610.28405",
    url: "https://www.alphaxiv.org/abs/2610.28405",
    urlLabel: "alphaXiv:2610.28405",
    coreContribution:
      "EgoSocial 用动态社交思维图建模多人社交边界；DIVE 则统一评测连续音视频流中的“风险主动介入 + 持续视觉追踪 + 多方视听指向识别”。",
    keyMetric: "EgoSoD 将社交介入时机准确率提升 +45.6%",
    designImplication:
      "家里有客人来访或家人严肃交谈时，通过视觉社交线索自动进入免打扰礼貌模式。",
  },

  // Pillar 6: Real-time Transcription, Diarization & Household Episodic Memory
  {
    id: "whisper-streaming-2023",
    shortName: "Whisper & Whisper-Streaming",
    title: "Robust Speech Recognition (Whisper) & Turning Whisper into Real-Time Transcription System",
    authorsVenue: "Radford et al. 2022 & Macháček et al. · IJCNLP 2023",
    year: 2023,
    era: "milestone",
    pillar: "minutes",
    arxivId: "2307.14743",
    url: "https://www.alphaxiv.org/abs/2307.14743",
    urlLabel: "alphaXiv:2307.14743",
    coreContribution:
      "提出 LocalAgreement-2 最长公共前缀确认策略，实现自适应低延迟流式转写，成为本地部署实时转写的事实标准。",
    keyMetric: "长语音流平均延迟 3.3s，WER 仅比离线高 ~2%",
    designImplication:
      "全屋语音后台常驻转写基线，稳定前缀入库做家庭日志，未确认尾部供快门控低延迟响应。",
  },
  {
    id: "eend-qmsum",
    shortName: "EEND / FS-EEND & QMSum",
    title: "End-to-End Neural Speaker Diarization (1909.05952) & Query-based Meeting Summarization (2104.05938)",
    authorsVenue: "Fujita et al. 2019 & Zhong et al. NAACL 2021",
    year: 2021,
    era: "milestone",
    pillar: "minutes",
    arxivId: "2104.05938",
    url: "https://www.alphaxiv.org/abs/2104.05938",
    urlLabel: "alphaXiv:2104.05938",
    coreContribution:
      "EEND 奠定抗重叠语音的端到端说话人区分；QMSum 确立长对话“先定位片段再摘要（Locate-then-Summarize）”的按需追问纪要范式。",
    keyMetric: "DER 12.28%（传统聚类 28.77%）；支持跨时段按主题回溯问答",
    designImplication:
      "支撑家人随口问：“昨天晚饭时商量周末去哪玩、买什么东西来着？”的精确回溯。",
  },
  {
    id: "jedis-dixtral-2026",
    shortName: "JEDIS-LLM & Dixtral",
    title: "JEDIS-LLM (2511.16046) & Dixtral: Grounding Spoken LLMs in Multi-Speaker Audio (2606.18134)",
    authorsVenue: "alphaXiv Nov 2025 & Jun 2026",
    year: 2026,
    era: "recent",
    pillar: "minutes",
    arxivId: "2606.18134",
    url: "https://www.alphaxiv.org/abs/2606.18134",
    urlLabel: "alphaXiv:2606.18134",
    coreContribution:
      "JEDIS-LLM 用动态声纹缓存（SPC）流式同步输出预注册家人姓名与转写；Dixtral 用声纹掩码条件化编码器解决远场全屋麦克风多人重叠拾音。",
    keyMetric: "JEDIS-LLM WDER 1.73%；Dixtral 远场带角色转写 cpWER 优 29%",
    designImplication:
      "结合房间在场名单先验（缩小家庭成员声纹候选池），全屋远场麦分角色转写稳准狠；且声纹反过来能校准人在哪个房间！",
  },
  {
    id: "online-sum-egomem-2025",
    shortName: "EgoMem & Online Summarization",
    title: "EgoMem: Lifelong Memory Agent for Full-duplex Omnimodal Models (2509.11914) & Online Summarization (2502.03111)",
    authorsVenue: "alphaXiv Sep 2025 & Feb 2025",
    year: 2025,
    era: "recent",
    pillar: "minutes",
    arxivId: "2509.11914",
    url: "https://www.alphaxiv.org/abs/2509.11914",
    urlLabel: "alphaXiv:2509.11914",
    coreContribution:
      "EgoMem 从原始音视频流中用“人脸+声纹”识别多成员，自动切分对话边界并异步抽取人物事实/偏好/待办存入终身记忆库；2502.03111 给出滑动窗口实时增量摘要策略。",
    keyMetric: "音视频多成员身份检索与记忆更新准确率 >95%",
    designImplication:
      "把“会议纪要”彻底升级为“家庭情景记忆中枢（Family Episodic Memory）”，让定位、视觉与语音形成闭环。",
  },
];

export default function MultimodalVoicePresearchCanvas() {
  const theme = useHostTheme();
  const [selectedPillar, setSelectedPillar] = useCanvasState<PillarId>("pillar", "all");
  const [selectedEra, setSelectedEra] = useCanvasState<EraId>("era", "all");
  const [query, setQuery] = useCanvasState<string>("query", "");
  const [readMap, setReadMap] = useCanvasState<Record<string, boolean>>("readMap", {});

  const filteredPapers = PAPERS.filter((p) => {
    if (selectedPillar !== "all" && p.pillar !== selectedPillar) return false;
    if (selectedEra !== "all" && p.era !== selectedEra) return false;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      const hay = `${p.shortName} ${p.title} ${p.authorsVenue} ${p.coreContribution} ${p.designImplication} ${p.arxivId ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const milestoneCount = PAPERS.filter((p) => p.era === "milestone").length;
  const recentCount = PAPERS.filter((p) => p.era === "recent").length;
  const readCount = PAPERS.filter((p) => Boolean(readMap[p.id])).length;

  const toggleRead = (id: string, checked: boolean) => {
    setReadMap((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <Stack gap={24} style={{ padding: 20 }}>
      <Stack gap={8}>
        <H1>自研全屋空间智能底座 · 人物房间定位 × 全时主动语音 alphaXiv 预研全景</H1>
        <Text tone="secondary">
          针对脱离 Home Assistant 重构自研系统的两大核心支柱——「基于摄像头 + 移动设备的家庭成员房间级定位」与「无唤醒词全时主动语音及家庭纪要记忆系统」，汇总 {PAPERS.length} 篇开创性里程碑与 2025–2026 alphaXiv 前沿论文。
        </Text>
      </Stack>

      <Row gap={24} wrap align="center">
        <Stat value={String(PAPERS.length)} label="收录核心论文" />
        <Stat value={String(milestoneCount)} label="开创性 / 里程碑" tone="info" />
        <Stat value={String(recentCount)} label="2025–2026 前沿" tone="success" />
        <Stat value={`${readCount} / ${PAPERS.length}`} label="已读进度（自动保存）" />
      </Row>

      <Callout tone="info" title="两大方向合流的核心预研洞察：跨模态数据关联（Data Association）+ 空间上下文门控">
        全屋定位与全时语音在学术界最新架构（如 2026 年的 OmniSmartHome、HearthNet、SAS、CorVS+）中已完全合流：定位层通过「视觉轨迹 + 手机无线/IMU 可靠度权重 + 房间声纹」维护全屋成员实时位置图谱，消除“人机分离（手机忘在书房）”与“无摄像头隐私房盲区”；语音层则直接读取该房间在场图谱做就近拾音仲裁、声纹候选池裁剪、空间省略指代消歧（“把我房间的灯关了”）以及免打扰介入代价评估。
      </Callout>

      <Grid columns={2} gap={16} align="stretch">
        <Card>
          <CardHeader trailing={<Text size="small" tone="tertiary">单位：F1 / 准确率 (%)</Text>}>
            跨模态融合对「人物-手机身份定位」与「无唤醒词指向」的跃升
          </CardHeader>
          <CardBody>
            <Stack gap={8}>
              <BarChart
                height={190}
                categories={[
                  "传统步态匹配定位",
                  "CorVS+ 视-传感融合",
                  "SAS 纯音频无唤醒",
                  "SAS 摄像头+音频",
                ]}
                series={[
                  {
                    name: "核心任务 F1 得分",
                    data: [13.1, 76.1, 86.0, 95.0],
                    tone: "info",
                  },
                ]}
                yMin={0}
                yMax={100}
                valueSuffix="%"
                showValues
              />
              <Text size="small" tone="tertiary">
                数据来源：CorVS+ (alphaXiv:2510.26369，室内多人固定相机+手机传感器关联 F1) 与 SAS (alphaXiv:2604.08412，端侧无唤醒词设备指向检测 F1)。
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader trailing={<Text size="small" tone="tertiary">单位：百分比 (%)</Text>}>
            全屋无线辅助抗干扰与主动语音介入降误报对比
          </CardHeader>
          <CardBody>
            <Stack gap={8}>
              <BarChart
                height={190}
                categories={[
                  "家庭无线感知 (2506.04322)",
                  "主动介入决策 (PRISM 2602.01532)",
                ]}
                series={[
                  { name: "基线误报率 (False Alarm)", data: [63.1, 50.2], tone: "danger" },
                  { name: "引入运动学/代价门控后误报率", data: [8.4, 22.9], tone: "success" },
                ]}
                yMin={0}
                yMax={100}
                valueSuffix="%"
                showValues
              />
              <Text size="small" tone="tertiary">
                数据来源：2506.04322（15 户真实家庭过滤宠物/扫地机误报）与 PRISM (alphaXiv:2602.01532，ProactiveBench 主动介入误打断率)。
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Divider />

      <Stack gap={12}>
        <Row gap={12} align="center" wrap>
          <H2>六大模块预研论文总表</H2>
          <Spacer />
          <Text size="small" tone="tertiary">
            当前显示 {filteredPapers.length} / {PAPERS.length} 篇
          </Text>
        </Row>

        <Row gap={8} wrap align="center">
          <Pill active={selectedEra === "all"} onClick={() => setSelectedEra("all")}>
            全部阶段 ({PAPERS.length})
          </Pill>
          <Pill active={selectedEra === "milestone"} onClick={() => setSelectedEra("milestone")}>
            1. 领域开创性 / 里程碑 ({milestoneCount})
          </Pill>
          <Pill active={selectedEra === "recent"} onClick={() => setSelectedEra("recent")}>
            2. 2025–2026 最近值得关注 ({recentCount})
          </Pill>
          <Spacer />
          <TextInput
            value={query}
            onChange={setQuery}
            placeholder="搜索定位、BLE、Home、声纹、arXiv 号..."
            type="search"
            style={{ width: 260 }}
          />
          {(selectedPillar !== "all" || selectedEra !== "all" || query.trim() !== "") && (
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedPillar("all");
                setSelectedEra("all");
                setQuery("");
              }}
            >
              重置筛选
            </Button>
          )}
        </Row>

        <Row gap={8} wrap align="center">
          <Pill active={selectedPillar === "all"} onClick={() => setSelectedPillar("all")}>
            全部模块
          </Pill>
          {(Object.keys(PILLAR_META) as Array<Exclude<PillarId, "all">>).map((key) => (
            <Pill
              key={key}
              active={selectedPillar === key}
              onClick={() => setSelectedPillar(key)}
            >
              {PILLAR_META[key].shortLabel}
            </Pill>
          ))}
        </Row>

        <Table
          striped
          stickyHeader
          headers={[
            "已读",
            "工作 / 年份",
            "定位",
            "所属子模块",
            "核心突破与方法",
            "关键指标",
            "对自研全屋系统的落地启示",
            "alphaXiv / 原文",
          ]}
          columnAlign={["center", "left", "left", "left", "left", "left", "left", "left"]}
          rowTone={filteredPapers.map((p) => (p.era === "milestone" ? "info" : "success"))}
          rows={filteredPapers.map((p) => [
            <Checkbox
              key={`chk-${p.id}`}
              checked={Boolean(readMap[p.id])}
              onChange={(v) => toggleRead(p.id, v)}
            />,
            <Stack key={`name-${p.id}`} gap={2}>
              <Text weight="semibold">{p.shortName}</Text>
              <Text size="small" tone="tertiary">
                {p.authorsVenue}
              </Text>
            </Stack>,
            <Text
              key={`era-${p.id}`}
              size="small"
              weight="medium"
              style={{
                color: p.era === "milestone" ? theme.accent.primary : theme.text.primary,
              }}
            >
              {p.era === "milestone" ? "里程碑" : "近期前沿"}
            </Text>,
            <Text key={`pil-${p.id}`} size="small" tone="secondary">
              {PILLAR_META[p.pillar].shortLabel}
            </Text>,
            <Text key={`core-${p.id}`} size="small">
              {p.coreContribution}
            </Text>,
            <Text key={`met-${p.id}`} size="small" tone="secondary">
              {p.keyMetric}
            </Text>,
            <Text key={`imp-${p.id}`} size="small">
              {p.designImplication}
            </Text>,
            <Link key={`lnk-${p.id}`} href={p.url}>
              {p.urlLabel}
            </Link>,
          ])}
          emptyMessage="没有匹配的论文，请尝试放宽筛选条件。"
        />
      </Stack>

      <Divider />

      <Stack gap={12}>
        <H2>自研全屋系统各模块精读与工程吸收指南</H2>

        <CollapsibleSection
          title="模块 1：摄像头 + 移动设备房间级人物定位（解决“人机分离”与“无相机房间盲区”）"
          count={7}
          leading={<Swatch color="cyan" />}
          trailing={<Text size="small" tone="tertiary">核心精读：ViFiCon 22 · CorVS+ 25 · 2509.22869 · 2607.22731</Text>}
          defaultOpen
        >
          <Stack gap={6} style={{ paddingTop: 6, paddingBottom: 8 }}>
            <Text size="small">
              1. 跨模态人机绑定与解绑：借鉴 <Code>ViFiCon (2210.05513)</Code> 与 <Code>CorVS+ (2510.26369)</Code> 的“对应概率 + 可靠度权重”双输出思路——当手机 IMU 长时间完全静止而摄像头检测到人员跨房间移动时，自动降低手机 BLE/Wi-Fi 权重，切换为“视觉衣着特征 + 房间连通图传递”。
            </Text>
            <Text size="small">
              2. 零标定与自动指纹学习：用 <Code>Calibration-Free 3D MCPT (2607.22731)</Code> 的 VGGT 免标定方案建立公共区多相机统一坐标，再用 <Code>2509.22869</Code> 的视觉辅助自动标定法，在日常走动中自动训练你家户型的 Wi-Fi/BLE 房间分类器。
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection
          title="模块 2：替代 Home Assistant 的全屋状态总线与智能体编排底座"
          count={5}
          leading={<Swatch color="yellow" />}
          trailing={<Text size="small" tone="tertiary">核心精读：Sasha 24 · HearthNet 26 · OmniSmartHome 26</Text>}
          defaultOpen
        >
          <Stack gap={6} style={{ paddingTop: 6, paddingBottom: 8 }}>
            <Text size="small">
              1. 状态维护与控制隔离：结合 <Code>PersonalHomeBench (2604.16813)</Code> 的常驻 <Code>State Transcriber</Code> 与 <Code>HearthNet (2604.09618)</Code> 的执行租约（Actuation Leases），把底层感知融合写成实时内存图谱（谁在哪间房、在干嘛、手机是否随身），上层 Agent 只读图谱与下发带租约的动作。
            </Text>
            <Text size="small">
              2. 空间指代消歧：参考 <Code>OmniSmartHome (2609.32569)</Code> 的 PROME 工具链设计，把“说话人定位、头姿朝向、房间归属”封装成快速上下文注入，直接破解“把这儿调亮 / 提醒老爸吃饭”等家庭口语指代。
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection
          title="模块 3 & 4：全屋无唤醒词拾音路由 + 风险敏感的主动介入时机门控"
          count={14}
          leading={<Swatch color="orange" />}
          trailing={<Text size="small" tone="tertiary">核心精读：SAS 26 · LlamaPIE 25 · PRISM 26 · TGL 26</Text>}
        >
          <Stack gap={6} style={{ paddingTop: 6, paddingBottom: 8 }}>
            <Text size="small">
              1. 分房间差异化无唤醒词策略：在有摄像头的客厅/餐厅运行 <Code>SAS (2604.08412)</Code> 音视频模式（F1 0.95）+ <Code>AV-Dialog (2511.11124)</Code> 滤除电视背景人声；在无摄像头的卧室自动回退到 SAS 纯音频+交互历史模式（F1 0.86）。
            </Text>
            <Text size="small">
              2. 毫秒级图触发 + 代价阈值：用 <Code>TGL (2605.30152)</Code> 监听全屋异构事件流（11 ms 级），通过 <Code>PRISM (2602.01532)</Code> 按当前房间成员状态动态调整误打断惩罚 <Code>C_FA</Code>（如卧室夜间或书房会议中自动拉高阈值）。
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection
          title="模块 5 & 6：音视频同步流理解 + 家庭分角色转写与终身情景记忆"
          count={7}
          leading={<Swatch color="green" />}
          trailing={<Text size="small" tone="tertiary">核心精读：ROMA 26 · JEDIS-LLM 25 · Dixtral 26 · EgoMem 25</Text>}
        >
          <Stack gap={6} style={{ paddingTop: 6, paddingBottom: 8 }}>
            <Text size="small">
              1. 远场分角色转写与声纹反哺定位：用 <Code>JEDIS-LLM (2511.16046)</Code> 的预注册家人声纹缓存或 <Code>Dixtral (2606.18134)</Code> 处理远场交叠对话；一旦某房间麦克风高置信匹配到某成员声纹，立即作为强观测反向更新模块 1 的人物房间位置！
            </Text>
            <Text size="small">
              2. 家庭情景记忆闭环：参考 <Code>EgoMem (2509.11914)</Code> 与 <Code>Inner Thoughts (2501.00383)</Code>，日常餐桌/客厅闲聊不插嘴，后台自动抽取待办承诺、物品消耗与生活习惯写入家庭记忆库，在恰当时刻（如玄关出门前）精准触发提醒。
            </Text>
          </Stack>
        </CollapsibleSection>
      </Stack>
    </Stack>
  );
}
