import { faker } from '@faker-js/faker';

export interface CheckoutCustomerData {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface ContactUsFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface TextBoxUserData {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}

export interface WebTableEmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

/**
 * Centralized Faker data factory for generating realistic,
 * isolated test data per scenario execution.
 */
export class FakerData {
  static checkoutCustomer(): CheckoutCustomerData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode('#####')
    };
  }

  static contactUsForm(): ContactUsFormData {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      subject: `Automation Inquiry - ${faker.commerce.department()}`,
      message: faker.lorem.sentences(2)
    };
  }

  static textBoxUser(): TextBoxUserData {
    return {
      fullName: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      currentAddress: `${faker.location.streetAddress()}, ${faker.location.city()}`,
      permanentAddress: `${faker.location.streetAddress()}, ${faker.location.state()}`
    };
  }

  static webTableEmployee(): WebTableEmployeeData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      age: String(faker.number.int({ min: 22, max: 58 })),
      salary: String(faker.number.int({ min: 45000, max: 145000 })),
      department: faker.helpers.arrayElement([
        'QA Engineering',
        'Platform',
        'Product',
        'DevOps',
        'Analytics'
      ])
    };
  }

  static promptInput(): string {
    return faker.person.fullName();
  }
}
