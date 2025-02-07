export interface LoginDTO {
  email: string;
  password: string;
}
export enum Post {
  Administrator = "admin",
  Operator = "operator",
}
export interface UserI {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  imgURL: string;
  email: string;
  phone: string | null;
  post: Post;
  birthday: Date | null;
}
export interface SignupDTO {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  birthday: Date | null;
}
