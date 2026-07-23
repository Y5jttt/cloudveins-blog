---
title: 腾讯云 BGP 接驳点观测
subtitle: Where Tencent Cloud Meets the Internet
date: 2026-07-18
tags: [tencent, bgp, peering]
excerpt: 通过 BGP 路由表与 Looking Glass,定位腾讯云与各运营商、各 IXP 的实际接驳位置,以及故障时的绕行路径。
draft: false
---

上回追了阿里的国际出口,这一篇换 **腾讯云**,看它和公网"握手"的地方到底在哪。结论先行:**接驳点的地理位置,往往比带宽数字更能解释一次跨网慢。**

腾讯云(AS45090)的对外接驳,公开可达的 BGP 视图里大致分三类:

1. **直连运营商** —— 电信/联通/移动各自在多个城市有对等(Peer),省内流量尽量不出市;
2. **IXP 接驳** —— 在国内主流交换中心与各 ISP 互通,作为省内直连的补充;
3. **国际出口** —— 经自有海缆与转接商,这一点和阿里、华为的"谁家海缆近"高度相关。

> Peering is where the cloud stops being a cloud and becomes part of the network. Name the handshakes, and the latency stops being magic.

一次典型的故障绕行,会暴露真实拓扑。比如某省电信侧接驳抖动时,路由会临时改走 **联通方向再回切**,这一跳的 RTT 增量,就是"接驳点不在本省"的代价。

```text
 正常: 本机 → 市电信 Peer → 目标        RTT ~ 9ms
 绕行: 本机 → 市电信 → 省联通 → 市电信 → 目标   RTT ~ 23ms
```

所以"路由接驳情况"真正有价值的,不只是 *有几个 Peer*,而是 **Peer 在哪、故障时怎么退、退一步要付出多少毫秒*。这部分我会按厂商逐期拆,欢迎在评论区补你观测到的接驳点。
