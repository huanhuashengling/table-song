import db from '../mongodb'
let studentSchema = db.Schema({
    //------学生个人基本信息
    studentName: String,                //1  姓名
    sexType: String,                    //2  性别
    birthDate: String,                  //3  出生日期    不显示  从身份证获取
    brithPlaceCode: String,  //4  出生地
    grandPlaceCode: String,  //5  籍贯
    ethnic: String,                   //6  民族           默认汉族
    nation: String,                   //7  国家地区        默认中国
    contactPhoneNumber: String,         //31 联系电话
    notMainland: String,              //10 港澳台侨外       默认否
    type: String,                     //8  身份证件类型     默认居民身份证
    studentID: String,                  //9  身份证号
    politicalStatus: String,            //11  政治面貌    不显示  默认少先队员
    healthStatus: String,       //12  健康状况    不显示  默认健康或良好
    //------学生个人辅助信息
    householdPlaceCode: String,         //17  户口所在地
    householdType: String,              //18  户口性质
    strongPoint: String,                //19  特长
    //------学生学籍辅助信息
    inClassNum: String,                 //21  班内学号     默认空
    grade: String,             //22  年级        默认
    classNum: String,                   //23  班级        默认空
    enterSchoolYearMonth: String, //24  入学年月     默认
    admissionMode: String,        //25  入学方式    默认
    residentType: String,            //26  就读方式    默认
    studentSource: String,        //27  学生来源    默认
    //------学生个人联系方式
    address: String,                    //28  现住址
    contactAddress: String,             //29  现住址
    familyAddress: String,              //30  现住址    
    postalCode: String,                 //32  邮政编码
    //------学生个人扩展信息
    isOneChild: String,                 //35  是否独生子女
    hasPreschoolEducation: String,      //36  是否受过学前教育
    leftChildrenType: String,           //37  是否留守儿童
    withEnterCities: String,            //38  是否进城务工随迁子女
    orphan: String,                   //39  是否孤儿
    martyr: String,                   //40  是否烈士或优抚子女
    mainstream: String,         //41  随班就读
    disability: '无残疾',            //42  残疾类型
    govBuySeat: String,               //43  是否政府购买学位
    needHelp: String,                 //44  是否需要申请资助
    enjoyHelp: String,                //45  是否享受一补
    hasDoubleGirls: String,
    //------学生上下学交通方式
    distance: String,                   //46  上下学距离
    vehicle: String,                  //47  交通方式
    schoolbus: Boolean,                  //48  是否需要校车
    //-------学生家庭成员或监护人信息一
    keeper1Name: String,
    relation1: String,
    keeper1: Boolean,
    householdPlaceCode1: String,
    contact1PhoneNumber: String,
    address1: String,
    //-------学生家庭成员或监护人信息二
    keeper2Name: String,
    relation2: String,
    keeper2: Boolean,
    householdPlaceCode2: String,
    contact2PhoneNumber: String,
    address2: String,
    createTime: { type: Date, default: Date.now}
})
export default db.model('student', studentSchema)