// validators/EmailExistValidator.ts
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { User } from '../../../../entity/User'; // Assuming you have a User model

@ValidatorConstraint({ async: true }) 
export class EmailExistConstraint implements ValidatorConstraintInterface {
    async validate(email: string) {
        const user = await User.findOne({ where: { email } });
        return !user; // Return true if email doesn't exist, false otherwise
    }

    defaultMessage() {
        return 'Email $value already exists'; // Customize error message
    }
}

export function DoesEmailExist(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: EmailExistConstraint
        });
    };
}
