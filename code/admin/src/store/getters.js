const getters = {
    sources: state => state.app.sources,

    userName: state => state.user.name,
    schoolName: state => state.user.schoolName,
    schoolCode: state => state.user.schoolCode,
    userList: state =>state.user.list,
    userTotal: state =>state.user.total,

    applyTypes: state => state.student.applyTypes,
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
    studentTotal: state => state.student.total,
    oneStudent: state => state.student.oneStudent,
    nameDescDatas: state => state.student.nameDescDatas,
    gradeDescs: state => state.student.gradeDescs,
    classDescs: state => state.student.classDescs,
    exportStudentListFields: state => state.student.exportStudentListFields,

    teacherNameDescDatas: state => state.teacher.teacherNameDescDatas,
    teacherList: state => state.teacher.teacherList,
    teacherTotal: state => state.teacher.teacherTotal,
    oneTeacher: state => state.teacher.oneTeacher,
    exportTeacherListFields: state => state.teacher.exportTeacherListFields,

}
export default getters