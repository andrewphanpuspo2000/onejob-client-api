import companySchema from "./companySchema.js";

export const addCompany = (company) => {
  return companySchema(company).save();
};

export const findCompanyByFilter = (prop) => {
  return companySchema.findOne(prop);
};

export const findCompanyAndUpdate = (filter, data) => {
  return companySchema.findOneAndUpdate(filter, data);
};
