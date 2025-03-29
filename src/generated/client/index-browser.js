
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  phone: 'phone',
  clerkId: 'clerkId'
};

exports.Prisma.UserResumeScalarFieldEnum = {
  id: 'id',
  clerkId: 'clerkId',
  resumeTitle: 'resumeTitle',
  firstName: 'firstName',
  lastName: 'lastName',
  jobTitle: 'jobTitle',
  address: 'address',
  phone: 'phone',
  email: 'email',
  userEmail: 'userEmail',
  userName: 'userName',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JobScalarFieldEnum = {
  id: 'id',
  clerkId: 'clerkId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  position: 'position',
  company: 'company',
  location: 'location',
  mode: 'mode',
  status: 'status'
};

exports.Prisma.ResumeScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  createdAt: 'createdAt',
  thumbnailData: 'thumbnailData',
  image: 'image',
  resumeType: 'resumeType',
  themeColor: 'themeColor'
};

exports.Prisma.PersonalInfoScalarFieldEnum = {
  id: 'id',
  resumeId: 'resumeId',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  phone: 'phone',
  address: 'address',
  website: 'website',
  department: 'department',
  jobTitle: 'jobTitle',
  themeColor: 'themeColor'
};

exports.Prisma.ExperienceScalarFieldEnum = {
  id: 'id',
  company: 'company',
  role: 'role',
  resumeId: 'resumeId',
  startDate: 'startDate',
  endDate: 'endDate',
  dateRange: 'dateRange',
  duties: 'duties',
  responsibilities: 'responsibilities',
  accomplishments: 'accomplishments',
  clearance: 'clearance',
  grade: 'grade',
  status: 'status',
  time: 'time',
  description: 'description'
};

exports.Prisma.EducationScalarFieldEnum = {
  id: 'id',
  resumeId: 'resumeId',
  school: 'school',
  degree: 'degree',
  field: 'field',
  startYear: 'startYear',
  endYear: 'endYear',
  dateRange: 'dateRange',
  description: 'description'
};

exports.Prisma.SkillScalarFieldEnum = {
  id: 'id',
  resumeId: 'resumeId',
  name: 'name',
  level: 'level',
  description: 'description'
};

exports.Prisma.SummaryScalarFieldEnum = {
  id: 'id',
  resumeId: 'resumeId',
  text: 'text'
};

exports.Prisma.CertificationScalarFieldEnum = {
  id: 'id',
  resumeId: 'resumeId',
  title: 'title',
  issuer: 'issuer',
  issueDate: 'issueDate',
  expirationDate: 'expirationDate',
  credentialId: 'credentialId',
  credentialUrl: 'credentialUrl',
  dateRange: 'dateRange',
  description: 'description'
};

exports.Prisma.AchievementScalarFieldEnum = {
  id: 'id',
  resumeId: 'resumeId',
  title: 'title',
  description: 'description',
  date: 'date',
  dateRange: 'dateRange'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Mode = exports.$Enums.Mode = {
  FULLTIME: 'FULLTIME',
  PARTTIME: 'PARTTIME',
  INTERNSHIP: 'INTERNSHIP'
};

exports.Prisma.ModelName = {
  User: 'User',
  UserResume: 'UserResume',
  Job: 'Job',
  Resume: 'Resume',
  PersonalInfo: 'PersonalInfo',
  Experience: 'Experience',
  Education: 'Education',
  Skill: 'Skill',
  Summary: 'Summary',
  Certification: 'Certification',
  Achievement: 'Achievement'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
