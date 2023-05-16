// ========== Constants ================
const SET_ALL_SKILLS = 'skills/SETALLSKILLS';

// ========== Dispatch Action ============
const setAllSkills = (skills) => ({
	type: SET_ALL_SKILLS,
  payload: skills
});

// ========== Thunk Action Creator=======
export const thunkGetAllSkills = () =>  async (dispatch) => {
  const response = await fetch('/api/skills')
  if (response.ok) {
    const data = await response.json()
    dispatch(setAllSkills(data.skills))
  }
}

export const thunkCreateNewEducation = (skillData) =>  async (dispatch) => {
  const response = await fetch('/api/skills', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(skillData)
  })
  if (response.ok) {
    await dispatch(thunkGetAllSkills())
  }
}

export const thunkUpdateSkill = (skillId, skillData) =>  async (dispatch) => {
  const response = await fetch(`/api/skills/${skillId}`, {
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(skillData)
  })
  if (response.ok) {
    // const data = await response.json()
    await dispatch(thunkGetAllSkills())
  }
}

export const thunkDeleteEducation = (skillId) =>  async (dispatch) => {
  const response = await fetch(`/api/educations/${skillId}`, {
    method: 'DELETE',
  })
  if (response.ok) {
    // const data = await response.json()
    await dispatch(thunkGetAllSkills())
  }
}


// =========== Reducer =================
const initialState = { allSkills: {} };

const skillReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case SET_ALL_SKILLS:
      newState = {...state};
      newState.allSkills= normalizeData(action.payload)
      return newState
    default:
      return state
  }
}

export default skillReducer;

function normalizeData(dataArr) {
  let newObj = {};
  dataArr.forEach(element => {
    newObj[element.id] = element;
  })
  return newObj
}
