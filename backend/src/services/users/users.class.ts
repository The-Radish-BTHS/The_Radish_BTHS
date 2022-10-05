/* eslint-disable quotes */
import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";

import { createHash } from "node:crypto";
import { Params } from "@feathersjs/feathers";

// The Gravatar image service
const gravatarUrl = "https://s.gravatar.com/avatar";
// The size query. Our chat needs 60px images
const query = "s=60";
// Returns the Gravatar image for an email
const getGravatar = (email: string) => {
  // Gravatar uses MD5 hashes from an email address (all lowercase) to get the image
  const hash = createHash("md5").update(email.toLowerCase()).digest("hex");
  // Return the full avatar URL
  return `${gravatarUrl}/${hash}?${query}`;
};

interface UserData {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  avatar?: string;
  githubId?: string;
}

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  create(data: UserData, params?: Params) {
    // This is the information we want from the user signup data
    const { email, password, githubId, name } = data;
    // Use the existing avatar image or return the Gravatar for the email
    const avatar = data.avatar || getGravatar(email);
    // The complete user
    const userData = {
      email,
      name,
      password,
      githubId,
      avatar,
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }
}
