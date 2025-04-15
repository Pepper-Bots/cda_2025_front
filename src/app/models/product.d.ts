// Création de l'interface (avec type ou interface → interface pour des héritages)
type Product = {
  id: number,
  nom: string,
  codeArticle: string,
  description: string,
  prix: number,
  etat: Etat,
  etiquettes: Etiquette[]
}
