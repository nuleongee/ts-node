import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';
import { dbType } from './index';

class Post extends Model {
  public readonly id!: number;
  public content!: string;
  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

Post.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'post',
    charset: 'utf8mb4', // 이모티콘
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {};

export default Post;
