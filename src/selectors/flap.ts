export const apiInfoSelector = (state: ReduxState) => state.flap.apiInfo;

export const schoolsSelector = (state: ReduxState) => {
  if (state.flap.schools.loading) {
    return [];
  }

  if (!state.flap.schools.data) {
    return [];
  }

  return Object.values(state.flap.schools.data) as School[];
};
