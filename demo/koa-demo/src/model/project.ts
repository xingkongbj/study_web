import {
    Model,
    DataTypes,
    ModelAttributes,
    InitOptions,
} from 'sequelize';

import sequelize from './sequelize';

// 工程基础信息表
class Project extends Model {
    // 主键 ID
    public id!: number;

    // 新项目名称
    public name!: string;

    // 是否启用
    public type!: boolean;

    // 状态
    public status?: number | null;

    // 创建时间
    public readonly createdAt!: Date;

    // 修改时间
    public readonly updatedAt!: Date;
}

const ProjectAttributes: ModelAttributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'name',
    },
    type: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'type',
    },
    status: {
        type: DataTypes.INTEGER,
        field: 'status',
    },
};

const ProjectOptions: InitOptions = {
    sequelize,
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

export default Project;
