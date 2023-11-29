export enum EnumUserRole {
    CLIENT = 'ROLE_CLIENT',
    ROOT = 'ROLE_ADMIN'
}

// const userRole: UserRole = UserRole.CLIENT; // Atribuindo a role "CLIENT"
// const rootRole: UserRole = UserRole.ROOT; // Atribuindo a role "ROOT"

// function checkUserRole(role: UserRole): void {
//     if (role === UserRole.CLIENT) {
//         console.log('É um usuário comum.');
//     } else if (role === UserRole.ROOT) {
//         console.log('É um usuário com permissões de root.');
//     } else {
//         console.log('Papel de usuário desconhecido.');
//     }
// }