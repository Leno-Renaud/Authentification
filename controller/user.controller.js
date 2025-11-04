import * as userService from "../services/user.service.js"

export async function handleRegister(request, reply) {
  const { username, password } = request.body
  await userService.registerUser(request.server, username, password)
  reply.send({ message: "User created" })
}

export async function handleLogin(request, reply) {
  const { username, password } = request.body;
  
  const token = await userService.loginUser(
    username,
    password,
    request.server.jwt,
    request.server.pg
  );

  reply.send({ token });
}

export async function handleMe(request, reply) {
  //Dans insomnia>header, Host>Authorisation, calculate> Bearer + token 
    return reply.send({ user: request.user });
}