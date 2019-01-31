const getters = {
    sources: state => state.app.sources,

    userName: state => state.user.name,
    userList: state =>state.user.list,
    userTotal: state =>state.user.total,

    IDTypes: state => state.student.IDTypes,
    sexTypes: state => state.student.sexTypes,
    ethnics: state => state.student.ethnics,
    nations: state => state.student.nations,
    healthStatuses: state => state.student.healthStatuses,
    householdTypes: state => state.student.householdTypes,
    politicalStatuses: state => state.student.politicalStatuses,
    studentSources: state => state.student.studentSources,
    notMainlands: state => state.student.notMainlands,
    leftChildrenTypes: state => state.student.leftChildrenTypes,
    switchStates: state => state.student.switchStates,
    vehicles: state => state.student.vehicles,
    relations: state => state.student.relations,
    mainstreams: state => state.student.mainstreams,
    disabilities: state => state.student.disabilities,
    residentTypes: state => state.student.residentTypes,
    admissionModes: state => state.student.admissionModes,
    bloodTypes: state => state.student.bloodTypes,
    studentList: state => state.student.list,
    studentTotal: state => state.student.total
}
export default getters