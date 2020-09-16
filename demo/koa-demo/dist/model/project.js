"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
// 工程基础信息表
class Project extends sequelize_1.Model {
}
const ProjectAttributes = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'name',
    },
    type: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        field: 'type',
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'status',
    },
};
const ProjectOptions = {
    sequelize: sequelize_2.default,
    // 表名
    tableName: 'project',
    // 开启逻辑删除，删除时添加 deletedAt，需要 timestamps 开启
    paranoid: true,
    // 开启驼峰转换，js 的 updatedAt 转换为 sql 的 updated_at
    underscored: true,
    // 创建索引
    indexes: [{
            unique: true,
            fields: ['name'],
        }],
};
Project.init(ProjectAttributes, ProjectOptions);
exports.default = Project;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9wcm9qZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBS21CO0FBRW5CLDJDQUFvQztBQUVwQyxVQUFVO0FBQ1YsTUFBTSxPQUFRLFNBQVEsaUJBQUs7Q0FrQjFCO0FBRUQsTUFBTSxpQkFBaUIsR0FBb0I7SUFDdkMsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLHFCQUFTLENBQUMsT0FBTztRQUN2QixVQUFVLEVBQUUsSUFBSTtRQUNoQixhQUFhLEVBQUUsSUFBSTtRQUNuQixLQUFLLEVBQUUsSUFBSTtLQUNkO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRSxNQUFNO0tBQ2hCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHFCQUFTLENBQUMsT0FBTztRQUN2QixTQUFTLEVBQUUsS0FBSztRQUNoQixLQUFLLEVBQUUsTUFBTTtLQUNoQjtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87UUFDdkIsS0FBSyxFQUFFLFFBQVE7S0FDbEI7Q0FDSixDQUFDO0FBRUYsTUFBTSxjQUFjLEdBQWdCO0lBQ2hDLFNBQVMsRUFBVCxtQkFBUztJQUNULEtBQUs7SUFDTCxTQUFTLEVBQUUsU0FBUztJQUVwQiwwQ0FBMEM7SUFDMUMsUUFBUSxFQUFFLElBQUk7SUFFZCw2Q0FBNkM7SUFDN0MsV0FBVyxFQUFFLElBQUk7SUFFakIsT0FBTztJQUNQLE9BQU8sRUFBRSxDQUFDO1lBQ04sTUFBTSxFQUFFLElBQUk7WUFDWixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDbkIsQ0FBQztDQUNMLENBQUM7QUFFRixPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBRWhELGtCQUFlLE9BQU8sQ0FBQyJ9