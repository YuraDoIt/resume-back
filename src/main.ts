import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import * as dotenv from "dotenv"

import { AppModule } from "./app.module"

dotenv.config()

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const PORT = process.env.PORT

	const config = new DocumentBuilder()
		.setTitle("API Documentation")
		.setDescription("The API description")
		.setVersion("1.0")
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				name: "Authorization",
				in: "header"
			},
			"access-token"
		)
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup("api", app, document)

	await app.listen(PORT ?? 3001, () => {
		console.log(
			`Server started on port http://localhost:${process.env.PORT}/api`
		)
	})
}
bootstrap()
