---
title: 阿里云国际出口路由实测
subtitle: Tracing Aliyun's Egress to the World
date: 2026-07-20
tags: [aliyun, routing, measurement]
excerpt: 从一台杭州可用区的 ECS 出发,traceroute 到海外,看流量究竟在哪一跳离开阿里骨干、接入运营商国际出口。
draft: false
---

诸神把云网络造成黑箱,而我只想看清箱子里的线怎么连。这一篇,从一台 **杭州可用区的 ECS** 出发,`traceroute` 到海外,看流量究竟在哪一跳离开阿里骨干、接入运营商的国际出口。

实测先于结论。下面是一段去往法兰克福方向的探测(已脱敏,仅保留跳数与 AS 归属):

```text
 1  172.16.x.x      0.4ms  内网网关
 2  100.64.x.x      1.1ms  阿里骨干入口
 3  11.194.x.x      2.3ms  Aliyun Backbone (AS37963)
 4  47.97.x.x       3.0ms  Aliyun Backbone (AS37963)
 5  119.38.x.x      4.7ms  国际出口 · 上海 (CHINANET / AS4134)
 6  202.97.x.x     38.2ms  跨太平洋海缆
 7  84.17.x.x     168.5ms  DE-CIX 法兰克福 (AS1299)
 8  185.199.x.x    171.0ms  目标
```

> The cloud is a black box only until someone sends the first probe. Every hop you name, you own.

从这十一条里能读出几件事:**杭州→上海** 的国内段延迟极低,真正的成本发生在 **第 5→6 跳**——流量在 *上海* 才切入中国电信国际出口,再走海缆。也就是说,即便你买的是"华东"资源,国际出口的瓶颈仍然落在运营商侧,而不是阿里侧。

![云网脉络母题:黑曜石底、金线圆环、居中的拓扑](/images/marble-figure.svg)

若你想复现这套测量,把脚本放进 `public/scripts/` 并引用即可;本文关注的是**结论的可解释性**,而非工具本身。画图时我习惯用一张"拓扑母题"垫底——上面这张就是整站视觉的原点。

作为云脉的开篇,这篇想说的是:**工具会换,厂商会换,骨干会换;但"把一条链路认真地追到最后一跳"这件事,从不需要重写。** 这便是这个博客存在的理由。
