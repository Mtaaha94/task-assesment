import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Schema input properties (no Document here)
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "member" | "lead" | "admin";
}

// Instance methods
export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}


export type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
      // 🔐 hashed before save
    },
    role: {
  type: String,
  enum: ["member", "lead", "admin"],
  default: "member"
}

  },
  {
    timestamps: true
  }
);


UserSchema.pre("save", async function () {
  
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser, UserModel>("User", UserSchema);
