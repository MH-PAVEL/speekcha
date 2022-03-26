import './popup-18plus-content.less';
import { useTranslation } from '../../../../i18n';

export function Popup18PlusContent() {
  const { t } = useTranslation('terms');
  return (
    <div>
      <div className="confirmage__header text-center">
        {t(
          'YOU MUST BE OVER 18 AND AGREE TO THE TERMS BELOW BEFORE CONTINUING'
        )}
        :
      </div>
      <div className="confirmage__description text-center">
        <div className="scroll">
          <p>
            {t(
              'You also agree to share your information with Duodecad ITS Learn More'
            )}
            <br />
            {t(
              'You also agree to share information with Duodecad ITS because the website will not work properly without this agreement'
            )}
            .
            <br />
            {t(
              'An important part of the cam material is provided by Duodecad ITS'
            )}
            :
            <br />
            {t('The profiles content and photographs')}
            <br />
            {t('The player and his functionalities')}
            <br />
            {t('The payment processor')}
            <br />
            ...
            <br />
            {t(
              'Therefore, every page is depending on Duodecad ITS and can’t be dissociated with (users URL) service'
            )}
            .
          </p>
          <p>
            {t(
              'This website contains information, links, images and videos of sexually explicit material (collectively, the'
            )}{' '}
            &quot;{t('Sexually Explicit Material')}&quot;).
            {t(
              'Do NOT continue if: (i) you are not at least 18 years of age or the age of majority in each and every jurisdiction in which you will or may view the Sexually Explicit Material, whichever is higher (the'
            )}{' '}
            &quot;{t('Age of Majority')}&quot;), (ii){' '}
            {t('such material offends you, or')} (iii){' '}
            {t(
              'viewing the Sexually Explicit Material is not legal in each and every community where you choose to view it'
            )}
            .
          </p>
          <p>
            {t(
              'By choosing to enter this website you are affirming under oath and penalties of perjury pursuant to Title 28 U.S.C. § 1746 and other applicable statutes and laws that all of the following statements are true and correct'
            )}
            :
          </p>
          <ul>
            <li>
              {t('I have attained the Age of Majority in my jurisdiction')};
            </li>
            <li>
              {t(
                'The sexually explicit material I am viewing is for my own personal use and I will not expose any minors to the material'
              )}
              ;
            </li>
            <li>{t('I desire to receive/view sexually explicit material')};</li>
            <li>
              {t(
                'I believe that as an adult it is my inalienable constitutional right to receive/view sexually explicit material'
              )}
              ;
            </li>
            <li>
              {t(
                ' I believe that sexual acts between consenting adults are neither offensive nor obscene'
              )}
              ;
            </li>
            <li>
              {t(
                'The viewing, reading and downloading of sexually explicit materials does not violate the standards of any community, town,city, state or country where I will be viewing reading and/or downloading the Sexually Explicit Materials'
              )}
              ;
            </li>
            <li>
              {t(
                'I am solely responsible for any false disclosures or legal ramifications of viewing, reading or downloading any material appearing on this site. I further agree that neither this website nor its affiliates will be held responsible for any legal ramifications arising from any fraudulent entry into or use of this website'
              )}
              ;
            </li>
            <li>
              {t(
                'I understand that my use of this website is governed by the website'
              )}
              &apos;s
              <a href="/page/terms-and-conditions">Terms</a>
              {t(
                'which I have reviewed and accepted, and I agree to be bound by such Terms'
              )}
              .
            </li>
            <li>
              {t(
                'I agree that by entering this website, I am subjecting myself, and any business entity in which I have any legal or equitableinterest, to the personal jurisdiction of the State of Florida,Miami-Dade County, should any dispute arise at any time betweenthis website, myself and/or such business entity'
              )}
              ;
            </li>
            <li>
              {t(
                'This warning page constitutes a legally binding agreement betweenme, this website and/or any business in which I have any legal orequitable interest. If any provision of this Agreement is found to be unenforceable, the remainder shall be enforced as fully aspossible and the unenforceable provision shall be deemed modifiedto the limited extent required to permit its enforcement in a manner most closely representing the intentions as expressedherein'
              )}
              ;
            </li>
            <li>
              {t(
                'All performers on this site are over the age of 18, have consented being photographed and/or filmed, believe it is their right toengage in consensual sexual acts for the entertainment andeducation of other adults and I believe it is my right as an adultto watch them doing what adults do'
              )}
              ;
            </li>
            <li>
              {t(
                'The videos and images in this site are intended to be used by responsible adults as sexual aids, to provide sexual education and to provide sexual entertainment'
              )}
              ;
            </li>
            <li>
              {t(
                'I understand that providing a false declaration under the penalties of perjury is a criminal offense; and'
              )}
            </li>
            <li>
              I agree that this agreement is governed by the Electronic
              Signatures in Global and National Commerce Act (commonly known as
              the &quot;E-Sign Act&quot;), 15 U.S.C. § 7000, et seq., and by
              choosing to click on &quot;I Agree. Enter Here&quot; and
              indicating my agreement to be bound by the terms of this
              agreement, I affirmatively adopt the signature line below as my
              signature and the manifestation of my consent to be bound by the
              terms of this agreement.
            </li>
          </ul>
        </div>
        <p className="notice-txt">
          {t(
            'THIS SITE ACTIVELY COOPERATES WITH LAW ENFORCEMENT IN ALL INSTANCES OF SUSPECTED ILLEGAL USE OF THE SERVICE, ESPECIALLY IN THE CASE OF UNDERAGE USAGE OF THE SERVICE'
          )}
          .
        </p>
      </div>
    </div>
  );
}
