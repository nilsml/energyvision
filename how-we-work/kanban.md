# How we use Kanban as our preferred agile framework

## Principles
1. **Start with what you do now** - Kanban does not dictate setup or procedure. You can start with what you have.
1. **Agree to pursue incrementar, evolutionary change**
1. **Respect the current process, roles, responsibilities & titles**
1. **Encourage acts of leadership at all levels**

## How to succeed with Kanban
1. **Visualize the workflow**
    * Kanban board
    * Classes of Service
1. **Limit Work In Progress, WIP**
1. **Manage flow**
    * Strive for progess
1. **Make Process Policies Explicit**
    * Understand problem at hand
    * *Definition of done*
1. **Improve Collaboratively** (using models & the scientific method)

## Lean principles
\
 <img align="right" width="400" height="300" src="img/build-measure-learn.png" alt="Build-Measure-Learn">
* VALUE - "Everything a customer is willing to pay for"
    * Main motivation is to give value to the customer
    * Focus on business case
    * Understand the customer
* FLOW
    * Maintain the flow
    * Do not stop!
<br>
<br>
<br>
<br>
<br>
<br>

## Roles
### Service Delivery Manager (SDM)
* A bit similar to SCRUM Master, but not quite
* Make sure flow is maintained
* Facilitate improvement activities

### Product Owner (PO) or Service Request Manager
* Ensure customer needs are taken care of
* Manage risk

## Tools
* Priority meetings / backlog grooming
* Standups
* Retrospectives
* *Information Radiators* - dashboard with current project status
* Release planning
* Continous Integration

## The Kanban board
We have four categories of issues in this project:
* Epic
* User Story
* Task
* Bug

### Epic
* An Epic is a big piece of the systm/application. It could be a feature, a business need or similar that everyone in the project can relate to.
* The number of epics within a project should be limited. Somewhere between 10-30 is common.
* Epics are not testable. They should be broken down into User Stories that can be testet.
* Identifying epics is typically a task that involves the PO, the customer and the SDM. It can be a result from a [User Story Mapping](https://www.visual-paradigm.com/guide/agile-software-development/what-is-user-story-mapping/) exersise.\
Ex:\
*As a customer I would like to have access to the system through my phone*

### User Story (US)
A user story is a part of a delivery that gives business value. It should be able to express it in a concrete manner and it must be able to test it. A user story always exists in context of an epic.
\
\
User stories are expressed like this:\
*As a [type of user]\
I would like to [reach a goal]\
so that [business value is gained]*\
\
Example:\
*As a user of a mobile app I would like to be able to filter on tasks so that I can save valuable time*

User stories may be split further into Tasks when necessary.

### Task
A task on it's own does not give business value, but it is necessary in order to reach a larger goal. Tasks can be connected to a User Story, or they can exist on their own.\
\
Example:\
*As a web-api I would like access to more CPU power in order to shrink the response time to less than 50ms for service x*

### Bug
Bugs are unitentional and something that represents a problem in the system.
They are added to the board if found during testing, staging or in production. If a developer identifies a problem with the task at hand, this is not considered a bug and should be fixed as part of the initial task.\
Bugs should be associated with a User Story. That makes it easier to reason about them and track the cause of the issue.
It is important that a Bug is written in such a manner that it is easily testable; use acceptance criterias.\
Put bugs on top of the board so that it screams "Pick me!". We don't want many open bugs in the system!

## Classes of service
In Kanban there is the concept of "classes of service" that tells us something about how a task is classified. You can define whichever classes you like, but a good strategy is to keep it simple. A typical example is to use three classes:
1. Blocker – something that is blocking us and must be solved asap. Trumps WIP.
1. Critical – critical task (in most cases a bug) that should be prioritized, but not at the cost of the task you are working on.
1. Major – a regular task (or issue in Zenhub). All tasks should default to the same class when added to the board.

### Using the Zenhub board
1. Use templates for creating issues. Templates exist for User Stories, Tasks and Bugs in addition to built-in issue type Epic.
1. Write the gist of the issue in the subject. For a US that would be the entire US text (As a user bla bla bla…).
1. All new issues except bugs should be put in the **Backlog**. They will be prioritized during a grooming session.
1. Bugs are always put on top of the **Prioritized** column. The backlog is not to be filled with bugs we would fix at a later stage.
1. Make sure you finish any issue that you start. Issues move to the **RIGHT**, not to the left. If stuck, get some help!
1. Issues that exist to the right of the **Prioritized** column must have an asignee.