import { Link } from '../components/Link'
import { Seo } from '../components/Seo'
import { useI18n } from '../i18n'

export default function NotFound() {
  const { t, path } = useI18n()
  return (
    <>
      <Seo page="notFound" />
      <section className="section">
        <div className="wrap intro not-found">
          <span className="eyebrow">404</span>
          <h1 className="h1">{t.notFound.title}</h1>
          <p className="lead">{t.notFound.lead}</p>
          <Link to={path('home')} className="btn btn--primary">
            {t.notFound.back}
          </Link>
        </div>
      </section>
    </>
  )
}
