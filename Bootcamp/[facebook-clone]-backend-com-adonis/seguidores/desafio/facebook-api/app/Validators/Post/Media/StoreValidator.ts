import { schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file({
      size: "500mb",
      extnames: ["jpg", "png", "jpeg", "mp4", "mov"]
    })
  });

  public messages = {};
}
