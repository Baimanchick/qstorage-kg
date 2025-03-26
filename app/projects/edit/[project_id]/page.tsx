import { Projects } from '@/pages/projects'

type Props = {
  params: Promise<{ project_id: string }>
}

export default async function Page({ params }: Props) {
  const project_id = (await params).project_id

  return <Projects.Pages.Edit project_id={project_id} />
}
