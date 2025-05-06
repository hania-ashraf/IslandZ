import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/constants/roles.enum";

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true }) 
  email: string;

  @Prop({ required: true }) 
  password: string;

  @Prop({ enum: Role, default: Role.Admin }) // only admins log in
  role: Role;
}
export const UserSchema=SchemaFactory.createForClass(User);

//for the admin only 