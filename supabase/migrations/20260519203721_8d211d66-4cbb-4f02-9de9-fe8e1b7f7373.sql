
INSERT INTO public.categories (slug, sort_order, name_pt, name_en, name_es) VALUES
('brunch', 10, 'Brunch', 'Brunch', 'Brunch'),
('toasts', 20, 'Torradas', 'Toasts', 'Tostadas'),
('eggs', 30, 'Ovos', 'Eggs', 'Huevos'),
('croissants', 40, 'Croissants', 'Croissants', 'Croissants'),
('sandwiches', 50, 'Sanduíches', 'Sandwiches', 'Sándwiches'),
('pancake', 60, 'Panquecas', 'Pancake', 'Panqueca'),
('tapioca', 70, 'Tapioca / Crepioca', 'Tapioca / Crepioca', 'Tapioca / Crepioca'),
('smoothies', 80, 'Smoothies', 'Smoothies', 'Smoothies'),
('bowls', 90, 'Bowls', 'Bowls', 'Bowls'),
('coffee', 100, 'Cafés', 'Coffee', 'Cafés'),
('infusion', 110, 'Chás & Infusões', 'Infusion', 'Infusiones'),
('to-share', 120, 'Para Compartilhar', 'To Share', 'Para Compartir'),
('salads', 130, 'Saladas', 'Salads', 'Ensaladas'),
('main', 140, 'Pratos Principais', 'Main', 'Platos Principales'),
('desserts', 150, 'Sobremesas', 'Desserts', 'Postres'),
('softdrinks', 160, 'Bebidas sem Álcool', 'Softdrinks', 'Bebidas sin Alcohol'),
('drinks', 170, 'Drinks', 'Drinks', 'Tragos'),
('mocktails', 180, 'Mocktails', 'Mocktails', 'Mocktails'),
('beers', 190, 'Cervejas', 'Beers', 'Cervezas'),
('wines', 200, 'Vinhos', 'Wines', 'Vinos');

-- Sample products (placeholders, sem fotos)
WITH c AS (SELECT id, slug FROM public.categories)
INSERT INTO public.products (category_id, sort_order, price, name_pt, name_en, name_es, description_pt, description_en, description_es)
SELECT c.id, 10, 49.00, 'Brunch Bravo', 'Bravo Brunch', 'Brunch Bravo',
  'Ovos mexidos, bacon, torrada artesanal, queijo, frutas e suco do dia.',
  'Scrambled eggs, bacon, artisan toast, cheese, fruit and juice of the day.',
  'Huevos revueltos, bacon, tostada artesanal, queso, frutas y jugo del día.'
FROM c WHERE slug='brunch'
UNION ALL SELECT c.id, 10, 28.00, 'Torrada de Abacate', 'Avocado Toast', 'Tostada de Aguacate',
  'Pão de fermentação natural, abacate amassado, ovo pochê e sementes.',
  'Sourdough, smashed avocado, poached egg and seeds.',
  'Pan de masa madre, aguacate, huevo pochado y semillas.'
FROM c WHERE slug='toasts'
UNION ALL SELECT c.id, 10, 32.00, 'Ovos Benedict', 'Eggs Benedict', 'Huevos Benedict',
  'Muffin inglês, presunto, ovos pochê e molho holandês.',
  'English muffin, ham, poached eggs and hollandaise.',
  'Muffin inglés, jamón, huevos pochados y salsa holandesa.'
FROM c WHERE slug='eggs'
UNION ALL SELECT c.id, 10, 24.00, 'Croissant de Presunto e Queijo', 'Ham & Cheese Croissant', 'Croissant de Jamón y Queso',
  'Croissant folhado com presunto parma e queijo gruyère.',
  'Flaky croissant with parma ham and gruyère cheese.',
  'Croissant hojaldrado con jamón parma y queso gruyère.'
FROM c WHERE slug='croissants'
UNION ALL SELECT c.id, 10, 38.00, 'Sanduíche Bravo', 'Bravo Sandwich', 'Sándwich Bravo',
  'Pão ciabatta, frango grelhado, rúcula, tomate e maionese da casa.',
  'Ciabatta, grilled chicken, arugula, tomato and house mayo.',
  'Ciabatta, pollo a la parrilla, rúcula, tomate y mayonesa de la casa.'
FROM c WHERE slug='sandwiches'
UNION ALL SELECT c.id, 10, 29.00, 'Panqueca Americana', 'American Pancake', 'Panqueca Americana',
  'Pilha de panquecas com mel, manteiga e frutas vermelhas.',
  'Pancake stack with honey, butter and red berries.',
  'Pila de panquecas con miel, mantequilla y frutos rojos.'
FROM c WHERE slug='pancake'
UNION ALL SELECT c.id, 10, 26.00, 'Crepioca de Frango', 'Chicken Crepioca', 'Crepioca de Pollo',
  'Crepioca recheada com frango desfiado e queijo coalho.',
  'Crepioca filled with shredded chicken and coalho cheese.',
  'Crepioca rellena de pollo desmenuzado y queso coalho.'
FROM c WHERE slug='tapioca'
UNION ALL SELECT c.id, 10, 22.00, 'Smoothie Tropical', 'Tropical Smoothie', 'Smoothie Tropical',
  'Manga, maracujá, abacaxi e iogurte natural.',
  'Mango, passion fruit, pineapple and natural yogurt.',
  'Mango, maracuyá, piña y yogur natural.'
FROM c WHERE slug='smoothies'
UNION ALL SELECT c.id, 10, 34.00, 'Açaí Bowl', 'Açaí Bowl', 'Bowl de Açaí',
  'Açaí cremoso, banana, granola, morango e mel.',
  'Creamy açaí, banana, granola, strawberry and honey.',
  'Açaí cremoso, plátano, granola, fresa y miel.'
FROM c WHERE slug='bowls'
UNION ALL SELECT c.id, 10, 9.00, 'Espresso', 'Espresso', 'Espresso',
  'Café espresso curto, intenso e aromático.',
  'Short, intense and aromatic espresso.',
  'Espresso corto, intenso y aromático.'
FROM c WHERE slug='coffee'
UNION ALL SELECT c.id, 10, 14.00, 'Chá de Camomila', 'Chamomile Tea', 'Té de Manzanilla',
  'Infusão calmante de camomila orgânica.',
  'Soothing organic chamomile infusion.',
  'Infusión calmante de manzanilla orgánica.'
FROM c WHERE slug='infusion'
UNION ALL SELECT c.id, 10, 58.00, 'Tábua de Frios', 'Cold Cuts Board', 'Tabla de Fiambres',
  'Seleção de queijos, embutidos, geleias e torradas.',
  'Selection of cheeses, cold cuts, jams and toasts.',
  'Selección de quesos, embutidos, mermeladas y tostadas.'
FROM c WHERE slug='to-share'
UNION ALL SELECT c.id, 10, 36.00, 'Salada Caesar', 'Caesar Salad', 'Ensalada César',
  'Alface romana, frango grelhado, croutons, parmesão e molho caesar.',
  'Romaine, grilled chicken, croutons, parmesan and caesar dressing.',
  'Lechuga romana, pollo a la parrilla, crutones, parmesano y aderezo césar.'
FROM c WHERE slug='salads'
UNION ALL SELECT c.id, 10, 62.00, 'Risoto de Cogumelos', 'Mushroom Risotto', 'Risotto de Setas',
  'Arroz arbóreo cremoso com mix de cogumelos e parmesão.',
  'Creamy arborio rice with mixed mushrooms and parmesan.',
  'Arroz arbóreo cremoso con mix de setas y parmesano.'
FROM c WHERE slug='main'
UNION ALL SELECT c.id, 10, 24.00, 'Cheesecake de Frutas Vermelhas', 'Red Berries Cheesecake', 'Cheesecake de Frutos Rojos',
  'Clássico cheesecake com calda de frutas vermelhas.',
  'Classic cheesecake with red berries sauce.',
  'Cheesecake clásico con salsa de frutos rojos.'
FROM c WHERE slug='desserts'
UNION ALL SELECT c.id, 10, 12.00, 'Água com Gás', 'Sparkling Water', 'Agua con Gas',
  'Garrafa 500ml.','500ml bottle.','Botella 500ml.'
FROM c WHERE slug='softdrinks'
UNION ALL SELECT c.id, 10, 32.00, 'Caipirinha', 'Caipirinha', 'Caipiriña',
  'Cachaça, limão, açúcar e gelo.','Cachaça, lime, sugar and ice.','Cachaça, limón, azúcar y hielo.'
FROM c WHERE slug='drinks'
UNION ALL SELECT c.id, 10, 26.00, 'Virgin Mojito', 'Virgin Mojito', 'Mojito Virgin',
  'Hortelã, limão, açúcar e água com gás. Sem álcool.',
  'Mint, lime, sugar and sparkling water. Non-alcoholic.',
  'Menta, limón, azúcar y agua con gas. Sin alcohol.'
FROM c WHERE slug='mocktails'
UNION ALL SELECT c.id, 10, 18.00, 'IPA Artesanal', 'Craft IPA', 'IPA Artesanal',
  'Long neck 355ml, lúpulo cítrico e amargor equilibrado.',
  'Long neck 355ml, citrus hops, balanced bitterness.',
  'Long neck 355ml, lúpulo cítrico y amargor equilibrado.'
FROM c WHERE slug='beers'
UNION ALL SELECT c.id, 10, 32.00, 'Malbec — Taça', 'Malbec — Glass', 'Malbec — Copa',
  'Vinho tinto argentino, encorpado e frutado.',
  'Argentine red wine, full-bodied and fruity.',
  'Vino tinto argentino, con cuerpo y afrutado.'
FROM c WHERE slug='wines';
