const getters = {
    sources: state => state.app.sources,

    userName: state => state.user.name,
    userList: state =>state.user.list,
    userTotal: state =>state.user.total,

    blogTypes: state => state.blog.blogTypes,
    sexTypes: state => state.blog.sexTypes,
    ethnics: state => state.blog.ethnics,
    nations: state => state.blog.nations,
    healthStatuses: state => state.blog.healthStatuses,
    householdTypes: state => state.blog.householdTypes,
    politicalStatuses: state => state.blog.politicalStatuses,
    studentSources: state => state.blog.studentSources,
    notMainlands: state => state.blog.notMainlands,
    leftChildrenTypes: state => state.blog.leftChildrenTypes,
    switchStates: state => state.blog.switchStates,
    vehicles: state => state.blog.vehicles,
    relations: state => state.blog.relations,
    residentTypes: state => state.blog.residentTypes,
    admissionModes: state => state.blog.admissionModes,
    bloodTypes: state => state.blog.bloodTypes,
    blogList: state => state.blog.list,
    blogTotal: state => state.blog.total
}
export default getters