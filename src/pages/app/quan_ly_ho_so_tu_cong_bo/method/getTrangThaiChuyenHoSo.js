export default (state) => {
    const account_current = state.core.account_current;
    const { managementDepartment, regency } = account_current;
    const me = `${regency},${managementDepartment},1`;
    const not_me = `${regency},${managementDepartment},0`;
    return { me, not_me }
}