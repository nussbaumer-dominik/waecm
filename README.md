# WAECM
## Bsp 3 Gruppe 08
### 1. Komponenten Tests

Da wir Vite als Build-tool verwenden, hatten wir viele Probleme jest zum Laufgen zu bringen, da es dafür noch keinen first-party support gibt. Allerdings existiert ein Testing Framework für vite: vitest. Daher haben wir unsere Komponententests mit diesem umgesetzt.

Insgesamt wurden die Texte von 3 Komponenten getestet: Settings, NewPayment und PaymentSuccess. Diese wurden gewählt, da sie keine requests zum Backend enthalten und ihre props leicht "gemocked" werden können.

- Settings: Hier haben wir neben den angezeigten Texten auch überprüft, dass die beiden Inputs, Api-Key und Währung, korrekt befült werden.
- NewPayment: Neben den diversen Texten wird auch überprüft, dass die Umrechnung in Satoshi korrekt ist und die Inputfelder befüllt werden.
- PaymentSuccess: In dieser Komponente wurden lediglich die statischen Texte kontrolliert.

### 2. GitLab CI
Wir haben eine Pipeline mit mehreren Stages eingerichtet. Am Anfang werden die Node Modules installiert und in den Cache geladen, damit die nachfolgenden Frontend Jobs diese nicht erneut installieren müssen. Danach wird das package(-lock).json auf Sicherheitslücken mittels "npm audit" überprüft. Weiter geht es mit dem bauen von Front- und Backend in ihren jeweiligen Jobs. Abschließend wird das frontend noch mit eslint gelinted und danach mithilfe von kaniko ein docker image gemacht und in den docker hub hochgeladen. Das Backend wird ebenso mit der Hilfe von kaniko gebuildet und auf docker-hub hochgeladen.

### 3. Cookie Web Component
Wir haben das Design der Cookie-Komponente etwas abgeändert und sie im Footer platziert. Sobald man eine Option auswählt, werden die jeweiligen Cookies gesetzt, wobei der Wert des Cookies entweder auf true ist, sofern der Benutzer zugestimmt hat. Andernfalls ist der Inhalt des Cookies leer. Die notwendigen Cookies, also jene drei für das Speichern der Auswahl werden immer gesetzt.


## Bsp 2 Gruppe 08

Stack: 

- Frontend: React
  - Wir haben bis jetzt alle nur Erfahrung mit Angular gesammelt und wollten mal React ausprobieren, da es am Arbeitsmarkt sehr stark nachgefragt wird und diese LVA eine gute Möglichkeit bietet, sich damit vertraut zu machen.
- Backend: Spring Boot
  - Kennen wir bereits aus der LVA SEPM. Sollte uns leichter fallen, wodurch das Development schneller vorangeht, was uns Zeit gibt, React kennen zu lernen
- Database: MongoDB
  - Ermöglicht schnelle Entwicklung und eine hohe Schema-Flexibilität.

Wir haben drei Container erstellt:

- Ein Container agiert als Webserver und basiert auf dem offiziellen nginx Container, wo wir unsere React Komponenten hinzugefügt haben. Der Container gibt port 4444 nach außen frei.
- Der zweite Container basiert auf openjdk:17-alpine und startet das Sprong-Boot Backend auf Port 8080 und gibt diesen auch nach außen frei.
- Der dritte Container ist ein MongoDB Datenbankserver mit dem frigegebenen Port 27018

Start der Container ist mittels docker-compose up möglich
Alle drei Images wurden auf Docker Hub hochgeladen und stehen dort öffentlich zur verfügung

Frontend:

- diason/waecm:waecm-2022-group-08-bsp-2-frontend
- Hash: sha256:5d4ce9921abf1fdca5b0ade82d55eb162fadba6e0a8d0235c96d8b9c5b213d71

Backend:

- diason/waecm:waecm-2022-group-08-bsp-2-backend
- Hash: sha256:d08d3fa84105c8146841a657bfba2c56c9a3048bc5a0d440511d4bd14a65936e

Datenbank:

- mongo:latest
- Hash:sha256:7a64cdeaef8bad94f3a7f058a18c0de6b2f5dde640297b6100c3b88e2646d268

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://student.inso.tuwien.ac.at/dominik.nussbaumer/waecm.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://student.inso.tuwien.ac.at/dominik.nussbaumer/waecm/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!).  Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Visuals

Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation

Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage

Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Authors and acknowledgment

Show your appreciation to those who have contributed to the project.

Steven Ludwig

Dominik Nussbaumer

## Project status

If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
