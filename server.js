常量 表达 = 需要('快');
常量 拿来 = 需要('节点获取');
常量 应用 = 表达();
应用.使用(表达.json({ 限制: '10mb' }));

应用.使用((请求, res, 下一个) => {
    res.页眉('访问控制允许来源', '*');
    res.页眉('访问控制允许头字符', “内容类型”);
    下一个();
});

应用.邮政('/ocr', async (请求, res) => {
    尝试 {
        常量 { 图像 } = 请求.身体;
        常量 tokenUrl = “https://aip.baidubce.com/oauth/2.0/token？grant_type=客户端凭证&client_id=${过程.env.贝都因API密钥}&client_secret=${过程.env.百度密码密钥}`;
        常量 tokenResp = 等待 拿来(tokenUrl);
        常量 托恩数据 = 等待 tokenResp.json();
        常量 accessToken = 托恩数据.访问令牌;

        常量 ocrResp = 等待 拿来(`https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=${accessToken}`, {
            方法: 'POST',
            标题: { “内容类型”: 'application/x-www-form-urlencoded' },
            身体: 'image=' + 编码URI组件(图像)
        });
        常量 ocrData = 等待 ocrResp.json();
        res.json(ocrData);
    } 捕捉 (e) {
        res.状态(500).json({ 错误: e.消息 });
    }
});

应用.听(过程.env.港口 || 3000);
