import { body } from 'express-validator';

export const createMedicineValidator = [
  body('medicineName').notEmpty().withMessage('Medicine name is required'),
  body('brandName').notEmpty().withMessage('Brand name is required'),
  body('productType').notEmpty().withMessage('Product type  is required'),
  body('drugCategory')
    .isIn(['Antibiotic', 'Painkiller', 'Vitamin', 'Antifungal', 'Antiviral'])
    .withMessage('Invalid drug category'),
  body('dosageForm')
    .isIn(['Tablet', 'Capsule', 'Liquid', 'Ointment', 'Injection'])
    .withMessage('Invalid dosage form'),
  body('strength').notEmpty().withMessage('Strength is required'),
  body('manufacturer').notEmpty().withMessage('Manufacturer is required'),
  body('packSize').notEmpty().withMessage('Pack size is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('routeOfAdministration').notEmpty().withMessage('Route of administration is required'),
  body('TherapeuticClass').notEmpty().withMessage('Therapeutic Class is required'),
  body('indications').notEmpty().withMessage('Indications are required'),
  body('barcodeSKU').notEmpty().withMessage('barcodeSKU are required'),
  body('sideEffects').notEmpty().withMessage('Side effects are required'),
  body('contraindications').notEmpty().withMessage('Contraindications are required'),
  body('storageConditions').notEmpty().withMessage('Storage conditions are required'),
  body('shelfLife').notEmpty().withMessage('Shelf life is required'),
  body('prescriptionReq')
    .isIn(['YES', 'NO'])
    .withMessage('Prescription requirement must be "YES" or "NO"'),
  body('approvalInfo')
    .isIn(['FDA', 'EMA'])
    .withMessage('Approval info must be "FDA" or "EMA"'),
  body('batchNumber').notEmpty().withMessage('Batch number is required'),
  body('interactions').notEmpty().withMessage('Interactions are required'),
  body('countryOfOrigin').notEmpty().withMessage('Country of origin is required'),
  body('ndc').notEmpty().withMessage('NDC is required'),
  body('distributor').notEmpty().withMessage('Distributor is required'),
  body('specialConsiderations').notEmpty().withMessage('Special considerations are required'),
];

export const createUserValidator = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('role')
    .isIn(['ADMIN', 'USER'])
    .withMessage('Role must be "ADMIN" or "USER"')
];

export const createAdminUserValidator = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
];

export const loginValidationRules = [
	body('email').notEmpty().withMessage('Email is required'),
	body('email').isEmail().withMessage('Invalid email address'),
	body('password').notEmpty().withMessage('Password is required'),
];

export const createDoseFormValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
];