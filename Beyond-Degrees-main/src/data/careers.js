import baseData from './data.json';
import scienceDetail from './sd.json';
import commerceDetail from './commerce.json';
import artsDetail from './arts.json';
import nonDegreeDetail from './non-degree.json';

export const STREAMS = [
  { key: 'science', label: 'Science Students', image: '/assets/science.jpg' },
  { key: 'commerce', label: 'Commerce Students', image: '/assets/commerce.jpg' },
  { key: 'arts', label: 'Arts Students', image: '/assets/arts.gif' },
  { key: 'alternate', label: 'Alternate / No-Degree', image: '/assets/no degree.webp' }
];

const scienceDetailMap = new Map(
  (scienceDetail?.careers || []).map((c) => [c.career_name, c])
);

const commerceDetailMap = new Map(
  (commerceDetail?.careers || commerceDetail?.commerce_students_careers || []).map((c) => [c.career_name, c])
);

const artsDetailMap = new Map(
  (artsDetail?.careers || artsDetail?.arts_students_careers || []).map((c) => [c.career_name, c])
);

const nonDegreeDetailMap = new Map(
  (nonDegreeDetail?.non_degree_careers || []).map((c) => [c.career_name, c])
);

function mergeScienceCareer(career) {
  const detail = scienceDetailMap.get(career.career_name);
  if (!detail) return career;

  const mergedSalary = detail.salary_in_india || detail.salary_range_inr || career.salary_range_inr || {};

  return {
    ...career,
    ...detail,
    salary_range_inr: {
      entry_level: mergedSalary.entry || mergedSalary.entry_level || career?.salary_range_inr?.entry_level || '',
      mid_level: mergedSalary.mid || mergedSalary.mid_level || career?.salary_range_inr?.mid_level || '',
      high_level: mergedSalary.high || mergedSalary.high_level || career?.salary_range_inr?.high_level || ''
    }
  };
}

function mergeCommerceCareer(career) {
  const detail = commerceDetailMap.get(career.career_name);
  if (!detail) return career;

  const mergedSalary = detail.salary_in_india || detail.salary_range_inr || career.salary_range_inr || {};

  return {
    ...career,
    ...detail,
    salary_range_inr: {
      entry_level: mergedSalary.entry || mergedSalary.entry_level || career?.salary_range_inr?.entry_level || '',
      mid_level: mergedSalary.mid || mergedSalary.mid_level || career?.salary_range_inr?.mid_level || '',
      high_level: mergedSalary.high || mergedSalary.high_level || career?.salary_range_inr?.high_level || ''
    }
  };
}

function mergeArtsCareer(career) {
  const detail = artsDetailMap.get(career.career_name);
  if (!detail) return career;

  const mergedSalary = detail.salary_in_india || detail.salary_range_inr || career.salary_range_inr || {};

  return {
    ...career,
    ...detail,
    salary_range_inr: {
      entry_level: mergedSalary.entry || mergedSalary.entry_level || career?.salary_range_inr?.entry_level || '',
      mid_level: mergedSalary.mid || mergedSalary.mid_level || career?.salary_range_inr?.mid_level || '',
      high_level: mergedSalary.high || mergedSalary.high_level || career?.salary_range_inr?.high_level || ''
    }
  };
}

function mergeNonDegreeCareer(career) {
  const detail = nonDegreeDetailMap.get(career.career_name);
  if (!detail) return career;

  const mergedSalary = detail.salary_in_india || detail.salary_range_inr || career.salary_range_inr || {};

  return {
    ...career,
    ...detail,
    salary_range_inr: {
      entry_level: mergedSalary.entry || mergedSalary.entry_level || career?.salary_range_inr?.entry_level || '',
      mid_level: mergedSalary.mid || mergedSalary.mid_level || career?.salary_range_inr?.mid_level || '',
      high_level: mergedSalary.high || mergedSalary.high_level || career?.salary_range_inr?.high_level || ''
    }
  };
}

export function getStreamCareers(streamKey) {
  const data = baseData?.streams?.[streamKey] ?? [];
  if (streamKey === 'science') {
    return data.map(mergeScienceCareer);
  }
  if (streamKey === 'commerce') {
    return data.map(mergeCommerceCareer);
  }
  if (streamKey === 'arts') {
    return data.map(mergeArtsCareer);
  }
  if (streamKey === 'alternate') {
    return data.map(mergeNonDegreeCareer);
  }
  return data;
}

export function getCareerById(streamKey, careerId) {
  const careers = getStreamCareers(streamKey);
  return careers.find((c) => c.id === careerId) || null;
}

