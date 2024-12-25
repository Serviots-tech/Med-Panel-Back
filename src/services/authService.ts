import { comparePassword } from '../helpers/passwordHelper';
import { generateAccessToken } from '../helpers/tokenHelper';
import { updateTokenUserById, ValidateUserByEmail } from '../Repositories/userRepository';
import { CustomError } from '../utils/customError';

export const loginService = async (data: { email: string, password: string }) => {

    // check email already exits
    const user = await ValidateUserByEmail(data?.email)

    const isPasswordValid = await comparePassword(
        data?.password,
        user.password as string
    );

    if (!isPasswordValid) {
        throw new CustomError('Invalid Credentials', 401)
    }

    const accessToken = generateAccessToken({ id: user.id,email:user?.email, role: user?.role })

    const updatedToken = await updateTokenUserById(user?.id,accessToken)

    return { accessToken }

};
