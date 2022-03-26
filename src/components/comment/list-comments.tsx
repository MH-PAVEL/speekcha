import { PureComponent } from 'react';
import { Spin } from 'antd';
import { IUser } from 'src/interfaces';
import CommentItem from '@components/comment/comment-item';
import { IComment } from '../../interfaces/comment';

import { withTranslation, Link } from '../../../i18n';
// export default withTranslation('components')();

interface IProps {
  comments: IComment[];
  total?: number;
  requesting: boolean;
  onDelete?: Function;
  user?: IUser;
  canReply?: boolean;
  t: any;
}

class ListComments extends PureComponent<IProps> {
  render() {
    const { comments, requesting, user, onDelete, canReply, t } = this.props;
    return (
      <div className="cmt-list">
        {comments.length > 0 &&
          comments.map((comment: IComment) => (
            <CommentItem
              canReply={canReply}
              key={comment._id}
              item={comment}
              user={user}
              onDelete={onDelete}
            />
          ))}
        {!requesting && !comments.length && (
          <div className="text-center" style={{ margin: 10 }}>
            {t('Being the first to comment')}
          </div>
        )}
        {requesting && (
          <div className="text-center" style={{ margin: 10 }}>
            <Spin />
          </div>
        )}
      </div>
    );
  }
}

// export default withTranslation('components')(ListComments)
const TranslatedCopmonent = withTranslation('components')(ListComments);
export { TranslatedCopmonent as ListComments };
