export const regex = {
  phone: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
  password: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i),
  shinhanEmail: new RegExp(/^[\w-.]+@shinhan\.com$/),
  email: new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  username: new RegExp(/^[a-zA-Z0-9]{4,50}$/i),
}
