import inquirer from 'inquirer'
import shelljs from 'shelljs'

inquirer.prompt([
    {
        name: 'componentName',
        message: 'Quel composant voulez-vous créer ?'
    },
]).then(comp => {
    console.info('Service :', comp.componentName);
    const se = comp.componentName;
    shelljs.exec("ng g c shared/components/" + se)
    console.info("Composant crée avec succès")
});
