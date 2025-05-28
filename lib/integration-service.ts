import type { Project, Task } from "@/contexts/projects-context"
import type { Expense } from "@/contexts/expenses-context"

// This service connects data between different modules of the platform
export const IntegrationService = {
  // Connect project data with expenses
  connectProjectExpenses: (projectId: string, project: Project | undefined, expenses: Expense[]) => {
    if (!project) return null

    // Find expenses related to this project
    const projectExpenses = expenses.filter(
      (expense) => expense.category === "Project" && expense.notes?.includes(project.title),
    )

    return {
      project,
      expenses: projectExpenses,
      totalExpenses: projectExpenses.reduce((sum, expense) => sum + expense.amount, 0),
      remainingBudget: project.budget
        ? project.budget - projectExpenses.reduce((sum, expense) => sum + expense.amount, 0)
        : null,
    }
  },

  // Connect learning tasks with projects
  connectLearningWithProjects: (projects: Project[], tasks: Task[]) => {
    // Find learning tasks that might be relevant to active projects
    const projectKeywords = projects.flatMap((project) => [
      project.title.toLowerCase(),
      ...project.description.toLowerCase().split(" "),
    ])

    const relevantTasks = tasks.filter((task) =>
      projectKeywords.some(
        (keyword) => task.title.toLowerCase().includes(keyword) || task.description.toLowerCase().includes(keyword),
      ),
    )

    return relevantTasks
  },

  // Get upcoming deadlines across all systems
  getUpcomingDeadlines: (projects: Project[]) => {
    const deadlines = []

    // Get project milestones
    projects.forEach((project) => {
      project.milestones.forEach((milestone) => {
        if (!milestone.completed && milestone.dueDate) {
          deadlines.push({
            type: "milestone",
            projectId: project.id,
            projectTitle: project.title,
            title: milestone.title,
            dueDate: milestone.dueDate,
            id: milestone.id,
          })
        }
      })

      // Get project tasks
      project.tasks.forEach((task) => {
        if (task.status !== "completed" && task.dueDate) {
          deadlines.push({
            type: "task",
            projectId: project.id,
            projectTitle: project.title,
            title: task.title,
            dueDate: task.dueDate,
            id: task.id,
          })
        }
      })
    })

    // Sort by due date
    return deadlines.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  },
}
