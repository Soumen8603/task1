const db = require('../config/db'); // Imports { pool }

// SAFE query helper. This prevents all database connection leaks.
const query = async (text, params) => {
  let client;
  try {
    client = await db.pool.connect();
    const res = await client.query(text, params);
    return res;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  } finally {
    if (client) {
      client.release();
    }
  }
};

const companyModel = {
  createProfile: async (profileData, owner_id) => {
    const {
      company_name, about_company, organizations_type,
      industry_type, team_size, company_website,
      linkedin, facebook, twitter, instagram, youtube,
      logo_url, banner_url,
    } = profileData;
    const queryText = `
      INSERT INTO company_profile (
        owner_id, company_name, about_company, organizations_type,
        industry_type, team_size, company_website,
        linkedin, facebook, twitter, instagram, youtube,
        logo_url, banner_url
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `;
    const values = [
      owner_id, company_name, about_company, organizations_type,
      industry_type, team_size, company_website, // <-- Correct field name
      linkedin, facebook, twitter, instagram, youtube,
      logo_url, banner_url,
    ];
    const { rows } = await query(queryText, values);
    return rows[0];
  },

  getProfileByOwnerId: async (owner_id) => {
    const queryText = `SELECT * FROM company_profile WHERE owner_id = $1`;
    const { rows } = await query(queryText, [owner_id]);
    return rows[0];
  },

  updateProfileByOwnerId: async (profileData, owner_id) => {
    const {
      company_name, about_company, organizations_type,
      industry_type, team_size, company_website,
      linkedin, facebook, twitter, instagram, youtube,
    } = profileData;
    const queryText = `
      UPDATE company_profile SET
        company_name = $1, about_company = $2, organizations_type = $3,
        industry_type = $4, team_size = $5, company_website = $6,
        linkedin = $7, facebook = $8, twitter = $9,
        instagram = $10, youtube = $11, updated_at = CURRENT_TIMESTAMP
      WHERE owner_id = $12
      RETURNING *
    `;
    const values = [
      company_name, about_company, organizations_type,
      industry_type, team_size, company_website,
      linkedin, facebook, twitter, instagram, youtube,
      owner_id,
    ];
    const { rows } = await query(queryText, values);
    return rows[0];
  },

  updateLogoUrl: async (logo_url, owner_id) => {
    const queryText = `
      UPDATE company_profile
      SET logo_url = $1, updated_at = CURRENT_TIMESTAMP
      WHERE owner_id = $2
      RETURNING *
    `;
    const { rows } = await query(queryText, [logo_url, owner_id]);
    return rows[0];
  },

  updateBannerUrl: async (banner_url, owner_id) => {
    const queryText = `
      UPDATE company_profile
      SET banner_url = $1, updated_at = CURRENT_TIMESTAMP
      WHERE owner_id = $2
      RETURNING *
    `;
    const { rows } = await query(queryText, [banner_url, owner_id]);
    return rows[0];
  },
};

module.exports = companyModel;
