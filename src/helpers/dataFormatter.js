import { flatten, isEmpty, orderBy, pick, toUpper } from 'lodash';

export const formatUserSelectOption = (users = []) => {
  const usersList = [];
  if (typeof users === 'object') {
    users.forEach((user) => {
      usersList.push({
        label: `${user.salutation ? user.salutation : ''} ${user.firstname} ${
          user.lastname
        }`,
        value: user.id,
      });
    });
  }
  return usersList;
};

export const formatColleges = (colleges) => {
  const collegesList = [];
  colleges.forEach((college) => {
    collegesList.push({
      label: `${college.college_title}`,
      value: college.id,
    });
  });
  return collegesList;
};

export const formatDepartments = (departments) => {
  const departmentOptions = [];
  departments?.forEach((department) => {
    departmentOptions.push({
      label: `(${department?.department_code}) - ${department?.department_title}`,
      value: department.id,
    });
  });
  return departmentOptions;
};

export const formatFaculties = (faculties) => {
  const facultiesList = [];
  faculties.forEach((faculty) => {
    facultiesList.push({
      label: `${faculty.faculty_title}`,
      value: faculty.id,
    });
  });
  return facultiesList;
};

export const formatSubjects = (subjects) => {
  const subjectOptions = [];
  subjects.forEach((subject) => {
    subjectOptions.push({
      label: `(${subject.subject_code}) - ${subject.subject_name}`,
      value: subject.id,
    });
  });
  return subjectOptions;
};

export const formatMetadata = (metadata, fieldName, valueKey = null) => {
  const formattedMetadataValues = [];
  metadata.forEach((data) => {
    if (toUpper(data.metadata_name) === toUpper(fieldName)) {
      data.metadataValues.forEach((value) => {
        formattedMetadataValues.push({
          label: value.metadata_value,
          value: valueKey ? value[valueKey] : value.id,
        });
      });
    }
  });
  return orderBy(formattedMetadataValues, ['label'], 'asc');
};

export const formatSpecialization = (specializations) => {
  const specializationOptions = [];
  specializations.forEach((specialization) => {
    specializationOptions.push({
      label: `(${specialization.specialization_code}) - ${specialization.specialization_title}`,
      value: specialization.id,
    });
  });
  return specializationOptions;
};

export const formatProgrammes = (programmes, valueField = null) => {
  const formattedOptions = [];
  programmes.forEach((programme) => {
    formattedOptions.push({
      label: `(${toUpper(programme.programme_code)}) - ${toUpper(
        programme.programme_title
      )}`,
      value: valueField ? programme[valueField] : programme.id,
    });
  });
  return formattedOptions;
};

export const formatProgrammeWithCategories = (programmes) => {
  const formattedOptions = [];
  programmes.forEach((programme) => {
    formattedOptions.push({
      label: `(${toUpper(programme.programme_code)}) - ${toUpper(
        programme.programme_title
      )}`,
      value: programme.programme_id,
    });
  });
  return formattedOptions;
};

export const formatProgrammeVersions = (programmeVersions) => {
  const formattedOptions = [];
  programmeVersions.forEach((version) => {
    formattedOptions.push({
      label: toUpper(version.version_title),
      value: version.id,
    });
  });
  return formattedOptions;
};

export const formatProgrammeVersionModules = (versionModules) => {
  const formattedOptions = [];
  versionModules.forEach((versionModule) => {
    formattedOptions.push({
      label: versionModule?.module?.metadata_value,
      value: versionModule?.module_id,
    });
  });
  return orderBy(formattedOptions, ['label']);
};

export const formatProgrammeVersionModuleOptions = (moduleOptions) => {
  const formattedOptions = [];
  moduleOptions.forEach((moduleOption) => {
    formattedOptions.push({
      label: moduleOption?.option?.metadata_value,
      value: moduleOption?.option_id,
    });
  });
  return orderBy(formattedOptions, ['label']);
};

export const formatProgrammeVersionPlans = (plans) => {
  const formattedOptions = [];
  plans.forEach((plan) => {
    formattedOptions.push({
      label: plan.metadata_value,
      value: plan?.ProgrammeVersionPlan?.id,
    });
  });
  return formattedOptions;
};

export const formatProgrammeVersionSubjectCombinationCategories = (
  combinationCategories,
  value = null,
  label = null
) => {
  const formattedOptions = [];
  const categories = combinationCategories || [];
  categories.forEach((combinationCategory) => {
    formattedOptions.push({
      label: label
        ? combinationCategory[label]
        : combinationCategory.category.metadata_value,
      value: value ? combinationCategory[value] : combinationCategory?.id,
    });
  });
  return formattedOptions;
};

export const formatGrading = (grading) => {
  const formattedGrading = [];
  grading.forEach((grade) => {
    formattedGrading.push({
      label: grade.grading_code,
      value: grade.id,
    });
  });
  return formattedGrading;
};

export const removeEmptyOrNullObject = (obj) => {
  Object.keys(obj).forEach(
    (k) =>
      (obj[k] &&
        typeof obj[k] === 'object' &&
        removeEmptyOrNullObject(obj[k])) ||
      (!obj[k] && obj[k] !== undefined && delete obj[k])
  );
  return obj;
};

export const formatSubjectCombinationCategories = (categories) => {
  const formattedCategories = [];
  categories.forEach((category) => {
    formattedCategories.push({
      label: category.subject_combination_category,
      value: category.subject_combination_category_id,
    });
  });
  return formattedCategories;
};

export const formatAdmissionSchemes = (schemes) => {
  const formattedSchemes = [];
  schemes.forEach((scheme) => {
    formattedSchemes.push({
      label: scheme.scheme_name,
      value: scheme.id,
    });
  });
  return formattedSchemes;
};

export const formatAdmissionForms = (forms) => {
  const formattedForms = [];
  forms.forEach((form) => {
    formattedForms.push({
      label: form.form_name,
      value: form.id,
    });
  });
  return formattedForms;
};

export const getObjectValues = (objectValues) => {
  Object.keys(objectValues).forEach((objectKey) => {
    if (
      !isEmpty(objectValues[objectKey]) &&
      typeof objectValues[objectKey] === 'object'
    ) {
      if (Array.isArray(objectValues[objectKey])) {
        objectValues[objectKey] = objectValues[objectKey].map((object) => {
          if (typeof object === 'object') {
            if (Array.isArray(object)) {
              return getObjectValues(object);
            }
            return object.value;
          }
          return object;
        });
      } else if (typeof objectValues[objectKey] === 'object') {
        objectValues[objectKey] = objectValues[objectKey].value;
      }
    }
  });
  return objectValues;
};

export const formatRoleGroups = (roleGroups) => {
  const formattedGroups = [];
  roleGroups.forEach((group) => {
    formattedGroups.push({
      label: group.role_group_title,
      value: group.id,
    });
  });
  return formattedGroups;
};

export const formatUserRoles = (userRoles) => {
  const formattedRoles = [];
  userRoles.forEach((role) => {
    formattedRoles.push({
      label: role.role_title,
      value: role.id,
    });
  });
  return formattedRoles;
};

export const formatSecurityProfile = (securityProfiles) => {
  const formattedProfiles = [];
  securityProfiles.forEach((profile) => {
    formattedProfiles.push({
      label: profile.security_profile_name,
      value: profile.id,
    });
  });
  return formattedProfiles;
};

export const formatSystemApps = (applications) => {
  const formattedApps = [];
  applications.forEach((app) => {
    formattedApps.push({
      label: app.app_name,
      value: app.id,
    });
  });
  return formattedApps;
};

export const formatAppFunctions = (allApps, appId) => {
  const findApp = allApps.filter((app) => app.id === appId);
  const formattedFunctions = [];
  if (findApp) {
    findApp[0].app_functions.forEach((appFunction) => {
      formattedFunctions.push({
        label: appFunction.function_name,
        value: appFunction.id,
      });
    });
  }
  return formattedFunctions;
};

export const searchStringInArrayObject = (data, fields, valueToSearch) => {
  const searchedValue = [];
  if (typeof fields === 'string') {
    data.forEach((datum) => {
      const search = toUpper(datum[fields]).includes(toUpper(valueToSearch));
      if (search === true) searchedValue.push(datum);
    });
  } else {
    fields.forEach((field) => {
      data.forEach((datum) => {
        const search = toUpper(datum[field]).includes(toUpper(valueToSearch));
        if (search === true) searchedValue.push(datum);
      });
    });
  }
  return searchedValue;
};

export const generateFullHeadedBy = (
  arrayData,
  concatenatedHeadedBy = 'headed_by'
) => {
  const generatedArray = arrayData.filter((singleObject) => {
    // format singleObject head field by joining first and last name
    singleObject[concatenatedHeadedBy] = singleObject.headedBy
      ? `${singleObject.headedBy.firstname} ${singleObject.headedBy.lastname}`
      : '-';
    return singleObject;
  });
  return generatedArray;
};

export const moveKeysFromSubObjects = (arrayOfObjects, desiredKeysObject) => {
  const formattedArray = arrayOfObjects.map((singleObject) => {
    Object.entries(desiredKeysObject).forEach((entry) => {
      const [key, arrayOfFields] = entry;
      const pickedObj = pick(singleObject[key], arrayOfFields);
      // rename keys
      Object.keys(pickedObj).forEach((keyName) => {
        pickedObj[`${key}_${keyName}`] = pickedObj[keyName];
        delete pickedObj[keyName];
      });
      // spread renamed keys to parent object
      return {
        ...singleObject,
        ...pickedObj,
      };
    });
    return singleObject;
  });
  return formattedArray;
};

export const getDefaultSelectedValue = (selectOptions, value) => {
  // For case of isMulti Select Fields
  if (typeof value === 'object' && !isEmpty(value)) {
    const formattedSelectOptions = [];
    value.forEach((val) => {
      const findOption = selectOptions.find(
        (option) => toString(option.value) === toString(val)
      );
      if (findOption) formattedSelectOptions.push(findOption);
    });
    return formattedSelectOptions;
  }

  // For Single Selects
  const findOption = selectOptions.find((option) => option.value === value);
  return findOption || '';
};

export const getUnAssignedApps = (allApps, roleGroups) => {
  const apps = [];
  roleGroups.forEach((group) => apps.push(group.apps.map((app) => app.id)));
  const unassignedApps = allApps.filter(
    (app) => flatten(apps).includes(app.id) === false
  );
  return unassignedApps;
};

export const formatAcademicYears = (academicYears) => {
  const formattedAcademicYears = [];
  academicYears.forEach((academicYear) => {
    formattedAcademicYears.push({
      label: academicYear.academicYear.metadata_value,
      value: academicYear.id,
    });
  });
  return orderBy(formattedAcademicYears, ['label'], 'desc');
};

export const formatStudyYears = (studyYears) => {
  const formattedStudyYears = [];
  studyYears.forEach((studyYear) => {
    formattedStudyYears.push({
      label: studyYear.study_year,
      value: studyYear.id,
    });
  });
  return formattedStudyYears;
};

export const formatFeesWaivers = (feesWaivers) => {
  const formattedWaivers = [];
  feesWaivers.forEach((feesWaiver) => {
    formattedWaivers.push({
      label: feesWaiver.fees_waiver_name,
      value: feesWaiver.id,
    });
  });
  return formattedWaivers;
};

export const formatProgrammeTypes = (programmeTypes) => {
  const formattedType = [];

  if (!isEmpty(programmeTypes)) {
    programmeTypes.forEach((programmeType) => {
      formattedType.push({
        label: programmeType.programme_type,
        value: programmeType.programme_type_id,
      });
    });
  }
  return formattedType;
};

export const formatOtherFeesContext = (otherFeesContext) => {
  const queryData = {};
  Object.keys(otherFeesContext).forEach((context) => {
    queryData[context] = otherFeesContext[context].value;
  });
  return queryData;
};

export const generalFormatter = (objectsArray, label, value) => {
  const formattedData = [];
  if (!isEmpty(objectsArray)) {
    objectsArray.forEach((programmeType) => {
      formattedData.push({
        label: programmeType[label],
        value: programmeType[value],
      });
    });
    return formattedData;
  }
  return [];
};

export const getAcademicYearMetaData = (academicYearObject, metadataName) => {
  let campusList = [];
  if (!isEmpty(academicYearObject)) {
    academicYearObject.semesters.forEach((semester) => {
      campusList = [...campusList, ...semester[metadataName]];
    });
    return campusList;
  }
  return [];
};

export const formatNestedPlan = (plans) => {
  const formattedPlans = [];
  if (!isEmpty(plans)) {
    plans.forEach((plan) => {
      formattedPlans.push({
        label: plan.metadata_value,
        value: plan.ProgrammeVersionPlan.id,
      });
    });
  }
  return formattedPlans;
};

export const hasAcademicUnit = (institutionStructure, unit) => {
  if (!isEmpty(institutionStructure)) {
    const academicUnits = institutionStructure?.academic_units;
    if (typeof academicUnits === 'object') {
      const formattedUnits = academicUnits.map((academicUnit) =>
        toUpper(academicUnit)
      );
      return formattedUnits.includes(toUpper(unit));
    }
  }
  return false;
};

export const getOptionsValues = (input) => {
  const output = [];
  if (!isEmpty(input)) {
    input.forEach((elem) => {
      output.push(elem.value);
    });
  }
  return output;
};

export const toMoney = new Intl.NumberFormat().format;
