import { IPerformerGallery } from 'src/interfaces';
// import Link from 'next/link';
import './index.less';
import React from 'react';

import { useTranslation, Link } from '../../../i18n';

interface IProps {
  gallery: IPerformerGallery;
}

const PurchasedGalleryCard = ({ gallery }: IProps) => {
  const { t } = useTranslation('components');
  const { name, coverPhoto, _id } = gallery;
  return (
    <div className="purchased-gallery-card">
      <div className="purchased-gallery-card-thumb">
        <Link
          href={{
            pathname: '/photos',
            query: {
              data: JSON.stringify(gallery),
              id: _id
            }
          }}
          as={`/photos/${_id}`}
        >
          <a>
            <img
              src={
                coverPhoto?.thumbnails
                  ? coverPhoto.thumbnails[0]
                  : '/gallery.png'
              }
              alt=""
            />
          </a>
        </Link>
      </div>
      <div className="purchased-gallery-card-name">{name}</div>
    </div>
  );
};

export default PurchasedGalleryCard;
