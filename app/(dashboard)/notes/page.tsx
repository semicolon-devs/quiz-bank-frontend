import Link from 'next/link'
import SectionTitle from "@/components/sectionTitle";

const SomePage = () => {
  return (
    <section>
      <div className="flex justify-center">
        {/* <SectionTitle title={params[0]} /> */}
      </div>
      <Link
        href={{
          pathname: 'notes/view-note/',
          query: {
            name: 'Week 1 Note',
            id:'1v8gfl1iAmJ-WVFT9GMezE7tN23tTyjKT'

          }
        }}
      >
        Go to another page
      </Link>
    </section>
  )
}

export default SomePage