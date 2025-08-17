import { relations } from "drizzle-orm/relations";
import { user, account, category, product, productVariant, session } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
}));

export const productRelations = relations(product, ({one, many}) => ({
	category: one(category, {
		fields: [product.categoryId],
		references: [category.id]
	}),
	productVariants: many(productVariant),
}));

export const categoryRelations = relations(category, ({many}) => ({
	products: many(product),
}));

export const productVariantRelations = relations(productVariant, ({one}) => ({
	product: one(product, {
		fields: [productVariant.productId],
		references: [product.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));