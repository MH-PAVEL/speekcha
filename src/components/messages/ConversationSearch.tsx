import React from 'react';
import './ConversationSearch.less';
import { useTranslation } from '../../../i18n';

export default function ConversationSearch({ onSearch }: any) {
  const { t } = useTranslation('components');
  return (
    <div className="conversation-search">
      <input
        onChange={onSearch}
        type="search"
        className="conversation-search-input"
        placeholder={`${t('Search conversation')}....`}
      />
    </div>
  );
}
