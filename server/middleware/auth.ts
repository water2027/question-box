// middleware/auth.ts
export default defineEventHandler((event) => {
	// 获取请求URL
	const url = event.node.req.url;
	const method = event.node.req.method;

	// 定义需要验证的URL列表
	//  const blackUrls = ['/api/answer/create'] // 可以根据需要修改这些路径
	const blackUrls = [
		{
			url: '/api/answer/create',
			method: 'POST',
		},
		{
			url: '/api/answer',
			method: 'DELETE',
		},
	];

	// 检查当前URL是否在排除列表中
	if (
		!blackUrls.some((excludedUrl) => {
			return excludedUrl.url === url && excludedUrl.method === method;
		})
	) {
		// URL不在排除列表中，跳过认证检查
		return;
	}

	// 获取请求头中的认证信息
	const authHeader = event.node.req.headers.authorization;

	// 检查是否存在认证头
	if (!authHeader) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Missing Authorization Header',
		});
	}

	// 从环境变量中获取正确的认证信息
	const validAuth = process.env.AUTH_TOKEN;

	// 检查认证是否匹配
	// 通常 Authorization 头的格式为 "Bearer <token>"，所以我们需要提取 token 部分
	const token = authHeader.replace('Bearer ', '');

	if (token !== validAuth) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Invalid Authentication Token',
		});
	}

	// 认证通过，继续处理请求
});
