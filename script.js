const GRAMS_PER_SERVING = 50; // 50 grams per drag/click

let defaultIngredients = [
    { id: 1, name: 'Brown Rice', category: 'carbohydrates', calories: 112, protein: 2.6, carbs: 23.5, fat: 0.9, fiber: 1.8, emoji: '🍚', image: 'image-assets/brownrice.jpeg', color: '#d4a574' },
    { id: 2, name: 'Quinoa', category: 'carbohydrates', calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, fiber: 2.8, emoji: '🌾', image: 'image-assets/quinoa.jpeg', color: '#e8d5b7' },
    { id: 3, name: 'Sweet Potato', category: 'carbohydrates', calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1, fiber: 3, emoji: '🍠', image: null, color: '#ff7f50' },
    { id: 4, name: 'Oatmeal', category: 'carbohydrates', calories: 68, protein: 2.5, carbs: 12, fat: 1.4, fiber: 1.7, emoji: '🥣', image: 'image-assets/oatmeal.jpeg', color: '#f5deb3' },
    { id: 5, name: 'Whole Wheat Bread', category: 'carbohydrates', calories: 69, protein: 3.6, carbs: 11.6, fat: 0.9, fiber: 1.9, emoji: '🍞', image: 'image-assets/wheatbread.jpeg', color: '#8b4513' },
    
    { id: 6, name: 'Chicken Breast', category: 'proteins', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, emoji: '🍗', image: 'image-assets/chicken breast.jpeg', color: '#ffe4c4' },
    { id: 7, name: 'Salmon', category: 'proteins', calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, emoji: '🐟', image: 'image-assets/salmon.jpg', color: '#ff8c69' },
    { id: 8, name: 'Eggs', category: 'proteins', calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, emoji: '🥚', image: 'image-assets/eggs.jpeg', color: '#ffd700' },
    { id: 9, name: 'Tofu', category: 'proteins', calories: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.3, emoji: '🧈', image: 'image-assets/tofu.jpeg', color: '#f5f5dc' },
    { id: 10, name: 'Greek Yogurt', category: 'proteins', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, emoji: '🥛', image: 'image-assets/greek yougurt.jpeg', color: '#fffaf0' },
    { id: 11, name: 'Lean Beef', category: 'proteins', calories: 250, protein: 26, carbs: 0, fat: 15, fiber: 0, emoji: '🥩', image: 'image-assets/lean beef.jpeg', color: '#8b4513' },
    
    { id: 12, name: 'Avocado', category: 'fats', calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, emoji: '🥑', image: 'image-assets/avacado.jpeg', color: '#568203' },
    { id: 13, name: 'Olive Oil', category: 'fats', calories: 119, protein: 0, carbs: 0, fat: 14, fiber: 0, emoji: '🫒', image: 'image-assets/oliveoil.jpeg', color: '#808000' },
    { id: 14, name: 'Almonds', category: 'fats', calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5, emoji: '🥜', image: 'image-assets/almonds.jpeg', color: '#cd853f' },
    { id: 15, name: 'Walnuts', category: 'fats', calories: 185, protein: 4.3, carbs: 3.9, fat: 18.5, fiber: 1.9, emoji: '🌰', image: 'image-assets/walnuts.jpeg', color: '#8b4513' },
    { id: 16, name: 'Peanut Butter', category: 'fats', calories: 94, protein: 4, carbs: 3, fat: 8, fiber: 1, emoji: '🥜', image: 'image-assets/peanut butter.jpeg', color: '#d2691e' },
    
    { id: 17, name: 'Broccoli', category: 'fiber', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, fiber: 5.1, emoji: '🥦', image: 'image-assets/broccoli.jpeg', color: '#228b22' },
    { id: 18, name: 'Spinach', category: 'fiber', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, emoji: '🥬', image: 'image-assets/spinach.jpeg', color: '#2e8b57' },
    { id: 19, name: 'Black Beans', category: 'fiber', calories: 132, protein: 8.9, carbs: 23.7, fat: 0.5, fiber: 8.7, emoji: '🫘', image: 'image-assets/black beans.jpeg', color: '#2f4f4f' },
    { id: 20, name: 'Brussels Sprouts', category: 'fiber', calories: 43, protein: 3.4, carbs: 9, fat: 0.3, fiber: 3.8, emoji: '🥬', image: 'image-assets/brussel sprouts.jpeg', color: '#8fbc8f' },
    { id: 21, name: 'Chia Seeds', category: 'fiber', calories: 138, protein: 4.7, carbs: 12, fat: 8.7, fiber: 9.8, emoji: '🌱', image: null, color: '#696969' }
];

const recommendedBalance = {
    carbohydrates: 45,
    proteins: 25,
    fats: 20,
    fiber: 10
};

let ingredients = [];
let plateItems = [];
let currentFilter = 'all';
let searchQuery = '';
let concurrentChart = null;
let isMobile = false;
let nextId = 1000; // Start custom IDs from 1000

function initializeApp() {
    loadSavedTheme();
    initializeWaveBackground();
    loadIngredientsFromStorage();
    checkMobileDevice();
    setupEventListeners();
    renderIngredients();
    
    if (!isMobile) {
        setupDragAndDrop();
    }
    
    renderConcurrentChart();
    updateChartColors();
    
    window.addEventListener('resize', () => {
        checkMobileDevice();
        renderIngredients();
        if (!isMobile) {
            setupDragAndDrop();
        }
    });
}

function loadIngredientsFromStorage() {
    const storedIngredients = localStorage.getItem('customIngredients');
    let customIngredients = storedIngredients ? JSON.parse(storedIngredients) : [];
    
    // Ensure all custom ingredients have proper data types
    customIngredients = customIngredients.map(ingredient => ({
        ...ingredient,
        calories: Number(ingredient.calories) || 0,
        protein: Number(ingredient.protein) || 0,
        carbs: Number(ingredient.carbs) || 0,
        fat: Number(ingredient.fat) || 0,
        fiber: Number(ingredient.fiber) || 0
    }));
    
    console.log('Loaded custom ingredients:', customIngredients); // Debug log
    
    ingredients = [...defaultIngredients, ...customIngredients];
    
    // Update nextId to avoid conflicts
    if (customIngredients.length > 0) {
        nextId = Math.max(...customIngredients.map(ing => ing.id)) + 1;
    }
}

function saveIngredientsToStorage() {
    const customIngredients = ingredients.filter(ing => ing.id >= 1000);
    localStorage.setItem('customIngredients', JSON.stringify(customIngredients));
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderIngredients();
    });
    
    // Dropdown functionality
    const dropdownBtn = document.getElementById('filterDropdown');
    const dropdownContent = document.getElementById('dropdownContent');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    dropdownBtn.addEventListener('click', () => {
        dropdownBtn.classList.toggle('open');
        dropdownContent.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdownBtn.contains(e.target)) {
            dropdownBtn.classList.remove('open');
            dropdownContent.classList.remove('show');
        }
    });
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active item
            dropdownItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Update filter
            currentFilter = item.dataset.category;
            document.getElementById('dropdownText').textContent = item.textContent;
            
            // Close dropdown
            dropdownBtn.classList.remove('open');
            dropdownContent.classList.remove('show');
            
            renderIngredients();
        });
    });
    
    // Image preview for add ingredient modal
    const imageInput = document.getElementById('ingredientImage');
    imageInput.addEventListener('change', handleImagePreview);
}

function checkMobileDevice() {
    isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
}

function getFilteredIngredients() {
    let filtered = ingredients;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(ing => ing.category === currentFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
        filtered = filtered.filter(ing => 
            ing.name.toLowerCase().includes(searchQuery)
        );
    }
    
    return filtered;
}

function renderIngredients() {
    const grid = document.getElementById('ingredientsGrid');
    grid.innerHTML = '';
    
    const filteredIngredients = getFilteredIngredients();
    
    filteredIngredients.forEach(ingredient => {
        const item = document.createElement('div');
        item.className = 'ingredient-item';
        item.dataset.ingredientId = ingredient.id;
        
        if (!isMobile) {
            item.draggable = true;
        }
        
        // Calculate total grams for this ingredient in the plate
        const gramsOnPlate = plateItems.filter(item => item.id === ingredient.id).length * GRAMS_PER_SERVING;
        
        item.innerHTML = `
            ${ingredient.id >= 1000 ? `<button class="delete-ingredient-btn" onclick="deleteCustomIngredient(${ingredient.id})" title="Delete custom ingredient">×</button>` : ''}
            <div class="ingredient-image">
                ${ingredient.image ? 
                    `<img src="${ingredient.image}" alt="${ingredient.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                     <span class="emoji-fallback" style="display:none;">${ingredient.emoji}</span>` : 
                    `<span class="emoji-fallback">${ingredient.emoji}</span>`
                }
            </div>
            <div class="ingredient-name">${ingredient.name}</div>
            ${isMobile ? `
                <div class="ingredient-controls">
                    <button class="counter-btn" onclick="removeServing(${ingredient.id})">−</button>
                    <span class="counter-value">${gramsOnPlate}g</span>
                    <button class="counter-btn" onclick="addServing(${ingredient.id})">+</button>
                </div>
            ` : ''}
        `;
        
        grid.appendChild(item);
    });
    
    if (!isMobile) {
        setupDragAndDrop();
    }
}

function addServing(ingredientId) {
    const ingredient = ingredients.find(ing => ing.id === ingredientId);
    if (ingredient) {
        addToPlate(ingredient);
        renderIngredients();
    }
}

function removeServing(ingredientId) {
    const index = plateItems.findIndex(item => item.id === ingredientId);
    if (index !== -1) {
        plateItems.splice(index, 1);
        renderPlate();
        renderConcurrentChart();
        updateRecommendations();
        renderIngredients();
    }
}

function setupDragAndDrop() {
    const ingredientItems = document.querySelectorAll('.ingredient-item');
    const plate = document.getElementById('plate');
    
    ingredientItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('ingredientId', item.dataset.ingredientId);
            item.classList.add('dragging');
        });
        
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });
    
    plate.addEventListener('dragover', (e) => {
        e.preventDefault();
        plate.classList.add('drag-over');
    });
    
    plate.addEventListener('dragleave', () => {
        plate.classList.remove('drag-over');
    });
    
    plate.addEventListener('drop', (e) => {
        e.preventDefault();
        plate.classList.remove('drag-over');
        
        const ingredientId = parseInt(e.dataTransfer.getData('ingredientId'));
        const ingredient = ingredients.find(ing => ing.id === ingredientId);
        
        if (ingredient) {
            addToPlate(ingredient);
            if (isMobile) {
                renderIngredients();
            }
        }
    });
    
    // Setup drag-out removal for plate items
    setupPlateItemDragAndDrop();
}

function setupPlateItemDragAndDrop() {
    const plateItemElements = document.querySelectorAll('.plate-item');
    const plate = document.getElementById('plate');
    
    // Remove existing event listeners to prevent duplicates
    document.body.removeEventListener('dragover', handleBodyDragOver);
    document.body.removeEventListener('drop', handleBodyDrop);
    
    plateItemElements.forEach(item => {
        item.draggable = true;
        
        item.addEventListener('dragstart', (e) => {
            const ingredientId = item.dataset.ingredientId;
            e.dataTransfer.setData('plateItemId', ingredientId);
            item.classList.add('dragging');
            console.log('Drag started for ingredient ID:', ingredientId);
        });
        
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
        
        // Right-click weight control
        item.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const ingredientId = parseInt(item.dataset.ingredientId);
            const itemName = item.querySelector('.plate-item-name').textContent;
            showWeightControlModal(ingredientId, itemName);
        });
    });
    
    // Add event listeners to body for drag-out removal
    document.body.addEventListener('dragover', handleBodyDragOver);
    document.body.addEventListener('drop', handleBodyDrop);
}

function handleBodyDragOver(e) {
    const plate = document.getElementById('plate');
    // Only allow drop outside the plate
    if (!plate.contains(e.target) && !e.target.closest('.plate-item')) {
        e.preventDefault();
    }
}

function handleBodyDrop(e) {
    const plate = document.getElementById('plate');
    // Only handle drops outside the plate
    if (!plate.contains(e.target) && !e.target.closest('.plate-item')) {
        e.preventDefault();
        const plateItemId = e.dataTransfer.getData('plateItemId');
        console.log('Dropped outside plate, ingredient ID:', plateItemId);
        
        if (plateItemId) {
            const ingredientId = parseInt(plateItemId);
            console.log('Removing all servings of ingredient ID:', ingredientId);
            removeAllFromPlate(ingredientId);
        }
    }
}

function addToPlate(ingredient) {
    // Create a deep copy to avoid reference issues
    const plateIngredient = {
        id: ingredient.id,
        name: ingredient.name,
        category: ingredient.category,
        calories: Number(ingredient.calories) || 0,
        protein: Number(ingredient.protein) || 0,
        carbs: Number(ingredient.carbs) || 0,
        fat: Number(ingredient.fat) || 0,
        fiber: Number(ingredient.fiber) || 0,
        emoji: ingredient.emoji,
        image: ingredient.image,
        color: ingredient.color,
        uniqueId: Date.now() + Math.random()
    };
    
    console.log('Adding to plate:', plateIngredient); // Debug log
    
    plateItems.push(plateIngredient);
    renderPlate();
    renderConcurrentChart();
    updateRecommendations();
}

function renderPlate() {
    const plateInner = document.querySelector('.plate-inner');
    
    if (plateItems.length === 0) {
        plateInner.innerHTML = '<span class="plate-hint">Drag ingredients here</span>';
        updateTotalGrams();
        return;
    }
    
    plateInner.innerHTML = '';
    
    // Group items by ingredient id for display
    const groupedItems = {};
    plateItems.forEach(item => {
        if (!groupedItems[item.id]) {
            groupedItems[item.id] = { ...item, count: 0, items: [] };
        }
        groupedItems[item.id].count++;
        groupedItems[item.id].items.push(item);
    });
    
    const itemsArray = Object.values(groupedItems);
    const totalItems = itemsArray.length;
    
    itemsArray.forEach((group, index) => {
        const plateItem = document.createElement('div');
        plateItem.className = 'plate-item';
        
        // Calculate position within plate bounds
        const angle = (360 / totalItems) * index - 90;
        const radius = Math.min(70, 120 - (totalItems * 3)); // Adjust radius based on item count
        const x = radius * Math.cos(angle * Math.PI / 180);
        const y = radius * Math.sin(angle * Math.PI / 180);
        
        // Ensure items stay within plate (considering item size ~35px)
        const maxRadius = 105; // plate radius (140px) minus item radius (35px)
        const distance = Math.sqrt(x * x + y * y);
        const finalX = distance > maxRadius ? (x / distance) * maxRadius : x;
        const finalY = distance > maxRadius ? (y / distance) * maxRadius : y;
        
        plateItem.style.left = `calc(50% + ${finalX}px - 30px)`;
        plateItem.style.top = `calc(50% + ${finalY}px - 30px)`;
        
        const totalGrams = group.count * GRAMS_PER_SERVING;
        
        plateItem.dataset.ingredientId = group.id;
        
        plateItem.innerHTML = `
            <button class="remove-btn" onclick="removeOneFromPlate(${group.id})" title="Remove ${GRAMS_PER_SERVING}g">−</button>
            <div class="plate-item-image">
                ${group.image ? 
                    `<img src="${group.image}" alt="${group.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                     <span class="emoji-fallback" style="display:none;">${group.emoji}</span>` : 
                    `<span class="emoji-fallback">${group.emoji}</span>`
                }
            </div>
            <div class="plate-item-name">${group.name}</div>
            <div class="plate-item-grams">${totalGrams}g</div>
        `;
        
        plateInner.appendChild(plateItem);
    });
    
    updateTotalGrams();
    
    // Setup drag and drop for plate items after rendering
    if (!isMobile) {
        setupPlateItemDragAndDrop();
    }
}

function removeOneFromPlate(ingredientId) {
    // Find the last occurrence of this ingredient and remove it
    for (let i = plateItems.length - 1; i >= 0; i--) {
        if (plateItems[i].id === ingredientId) {
            plateItems.splice(i, 1);
            break;
        }
    }
    
    renderPlate();
    renderConcurrentChart();
    updateRecommendations();
    
    if (isMobile) {
        renderIngredients();
    }
}

function removeAllFromPlate(ingredientId) {
    // Remove ALL servings of this ingredient from the plate
    plateItems = plateItems.filter(item => item.id !== ingredientId);
    
    renderPlate();
    renderConcurrentChart();
    updateRecommendations();
    
    if (isMobile) {
        renderIngredients();
    }
}

function clearPlate() {
    plateItems = [];
    renderPlate();
    renderConcurrentChart();
    updateRecommendations();
    if (isMobile) {
        renderIngredients();
    }
}

function updateTotalGrams() {
    const totalGrams = plateItems.length * GRAMS_PER_SERVING;
    const totalWeightDisplay = document.getElementById('totalWeightDisplay');
    
    if (totalWeightDisplay) {
        const totalValueElement = totalWeightDisplay.querySelector('.total-value');
        if (totalValueElement) {
            totalValueElement.textContent = `${totalGrams}g`;
        }
    }
}

// Modal functions
function openAddIngredientModal() {
    document.getElementById('addIngredientModal').style.display = 'block';
}

function closeAddIngredientModal() {
    document.getElementById('addIngredientModal').style.display = 'none';
    document.getElementById('addIngredientForm').reset();
    document.getElementById('imagePreview').innerHTML = '';
}

function handleImagePreview(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
}

function addNewIngredient(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get image data
    let imageData = null;
    const imageFile = document.getElementById('ingredientImage').files[0];
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageData = e.target.result;
            saveNewIngredient(formData, imageData);
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveNewIngredient(formData, null);
    }
}

function saveNewIngredient(formData, imageData) {
    // Debug log all form data
    console.log('Form data received:');
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
    
    const newIngredient = {
        id: nextId++,
        name: formData.get('ingredientName') || 'Unknown Ingredient',
        category: formData.get('ingredientCategory') || 'proteins',
        calories: parseFloat(formData.get('calories')) || 0,
        protein: parseFloat(formData.get('protein')) || 0,
        carbs: parseFloat(formData.get('carbs')) || 0,
        fat: parseFloat(formData.get('fat')) || 0,
        fiber: parseFloat(formData.get('fiber')) || 0,
        emoji: '🍽️', // Default emoji for custom ingredients
        image: imageData, // Base64 data URL or null
        color: '#667eea' // Default color
    };
    
    console.log('New ingredient object:', newIngredient); // Debug log
    
    // Validate the ingredient has necessary data
    if (!newIngredient.name || newIngredient.name === 'Unknown Ingredient') {
        alert('Please enter an ingredient name');
        return;
    }
    
    if (!newIngredient.category) {
        alert('Please select a category');
        return;
    }
    
    ingredients.push(newIngredient);
    saveIngredientsToStorage();
    renderIngredients();
    closeAddIngredientModal();
    
    // Show success message
    alert(`${newIngredient.name} added successfully!`);
}

function calculateNutritionTotals() {
    const totals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0
    };
    
    plateItems.forEach(item => {
        // Calculate nutrition based on 50g serving (values in database are per 100g)
        const multiplier = GRAMS_PER_SERVING / 100;
        const itemCalories = (item.calories || 0) * multiplier;
        const itemProtein = (item.protein || 0) * multiplier;
        const itemCarbs = (item.carbs || 0) * multiplier;
        const itemFat = (item.fat || 0) * multiplier;
        const itemFiber = (item.fiber || 0) * multiplier;
        
        totals.calories += itemCalories;
        totals.protein += itemProtein;
        totals.carbs += itemCarbs;
        totals.fat += itemFat;
        totals.fiber += itemFiber;
        
        // Debug log for troubleshooting
        if (itemCalories === 0 && itemProtein === 0 && itemCarbs === 0 && itemFat === 0 && itemFiber === 0) {
            console.warn(`Warning: ${item.name} has zero nutrition values!`, item);
        }
    });
    
    console.log('Total nutrition calculated:', totals); // Debug log
    return totals;
}

function calculateNutritionPercentages() {
    const totals = calculateNutritionTotals();
    const totalMacros = totals.protein + totals.carbs + totals.fat + totals.fiber;
    
    if (totalMacros === 0) {
        return { carbohydrates: 0, proteins: 0, fats: 0, fiber: 0 };
    }
    
    return {
        carbohydrates: Math.round((totals.carbs / totalMacros) * 100),
        proteins: Math.round((totals.protein / totalMacros) * 100),
        fats: Math.round((totals.fat / totalMacros) * 100),
        fiber: Math.round((totals.fiber / totalMacros) * 100)
    };
}

function updateChartColors() {
    const chartColors = [
        'rgba(102, 126, 234, 0.8)',
        'rgba(118, 75, 162, 0.8)', 
        'rgba(240, 147, 251, 0.8)',
        'rgba(79, 172, 254, 0.8)'
    ];
    
    const borderColors = [
        'rgba(102, 126, 234, 1)',
        'rgba(118, 75, 162, 1)',
        'rgba(240, 147, 251, 1)',
        'rgba(79, 172, 254, 1)'
    ];
    
    return { chartColors, borderColors };
}

function renderConcurrentChart() {
    const ctx = document.getElementById('concurrentChart').getContext('2d');
    const percentages = calculateNutritionPercentages();
    const { chartColors, borderColors } = updateChartColors();
    
    if (concurrentChart) {
        concurrentChart.destroy();
    }
    
    // Lighter colors for recommended (inner ring)
    const recommendedColors = chartColors.map(color => color.replace('0.8', '0.4'));
    const recommendedBorderColors = borderColors.map(color => color.replace('1)', '0.6)'));
    
    concurrentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Carbohydrates', 'Proteins', 'Fats', 'Fiber'],
            datasets: [
                // Inner ring - Recommended values
                {
                    label: 'Recommended',
                    data: [
                        recommendedBalance.carbohydrates,
                        recommendedBalance.proteins,
                        recommendedBalance.fats,
                        recommendedBalance.fiber
                    ],
                    backgroundColor: recommendedColors,
                    borderColor: recommendedBorderColors,
                    borderWidth: 1,
                    weight: 0.5 // Thinner inner ring
                },
                // Outer ring - Current values
                {
                    label: 'Current',
                    data: [
                        percentages.carbohydrates,
                        percentages.proteins,
                        percentages.fats,
                        percentages.fiber
                    ],
                    backgroundColor: chartColors,
                    borderColor: borderColors,
                    borderWidth: 2,
                    weight: 1 // Thicker outer ring
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '30%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        font: {
                            size: 11,
                            family: 'Inter'
                        },
                        color: '#a0a9c9',
                        generateLabels: function(chart) {
                            const original = Chart.defaults.plugins.legend.labels.generateLabels;
                            const labels = original.call(this, chart);
                            // Only show labels for the nutrient types, not datasets
                            return labels.slice(0, 4).map((label, index) => ({
                                ...label,
                                text: chart.data.labels[index]
                            }));
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems) {
                            return tooltipItems[0].label;
                        },
                        label: function(context) {
                            const datasetLabel = context.dataset.label;
                            return datasetLabel + ': ' + context.parsed + '%';
                        }
                    },
                    backgroundColor: 'rgba(10, 14, 39, 0.9)',
                    borderColor: 'rgba(102, 126, 234, 0.3)',
                    borderWidth: 1
                }
            }
        }
    });
}

function updateRecommendations() {
    const recommendationsDiv = document.getElementById('recommendations');
    
    if (plateItems.length === 0) {
        // Reset progress bars to zero
        updateProgressBar('carbsProgress', 0, 'carbsValue', 0, 45);
        updateProgressBar('proteinProgress', 0, 'proteinValue', 0, 25);
        updateProgressBar('fatsProgress', 0, 'fatsValue', 0, 20);
        updateProgressBar('fiberProgress', 0, 'fiberValue', 0, 10);
        
        // Clear individual recommendations
        document.getElementById('carbsRec').innerHTML = '';
        document.getElementById('proteinRec').innerHTML = '';
        document.getElementById('fatsRec').innerHTML = '';
        document.getElementById('fiberRec').innerHTML = '';
        
        recommendationsDiv.innerHTML = '<p class="empty-state">Add ingredients to receive personalized nutrition insights</p>';
        return;
    }
    
    const percentages = calculateNutritionPercentages();
    const totals = calculateNutritionTotals();
    const totalGrams = plateItems.length * GRAMS_PER_SERVING;
    
    // Update individual progress bars and recommendations
    updateNutrientProgress('carbohydrates', percentages.carbohydrates, recommendedBalance.carbohydrates, 'carbsProgress', 'carbsValue', 'carbsRec');
    updateNutrientProgress('proteins', percentages.proteins, recommendedBalance.proteins, 'proteinProgress', 'proteinValue', 'proteinRec');
    updateNutrientProgress('fats', percentages.fats, recommendedBalance.fats, 'fatsProgress', 'fatsValue', 'fatsRec');
    updateNutrientProgress('fiber', percentages.fiber, recommendedBalance.fiber, 'fiberProgress', 'fiberValue', 'fiberRec');
    
    // Overall recommendations
    const recommendations = [];
    
    if (percentages.proteins < recommendedBalance.proteins - 5) {
        recommendations.push({
            type: 'warning',
            icon: '⚠️',
            text: `Add more protein-rich foods like chicken, fish, or beans`
        });
    } else if (percentages.proteins > recommendedBalance.proteins + 10) {
        recommendations.push({
            type: 'caution',
            icon: '📊',
            text: `Consider reducing protein portions for better balance`
        });
    }
    
    if (percentages.carbohydrates > recommendedBalance.carbohydrates + 10) {
        recommendations.push({
            type: 'warning',
            icon: '⚠️',
            text: `Reduce carbohydrate portions like rice or bread`
        });
    } else if (percentages.carbohydrates < recommendedBalance.carbohydrates - 10) {
        recommendations.push({
            type: 'caution',
            icon: '📊',
            text: `Add healthy carbs like quinoa or sweet potato`
        });
    }
    
    if (percentages.fiber < recommendedBalance.fiber - 3) {
        recommendations.push({
            type: 'warning',
            icon: '⚠️',
            text: `Increase fiber with vegetables and whole grains`
        });
    }
    
    if (percentages.fats > recommendedBalance.fats + 10) {
        recommendations.push({
            type: 'caution',
            icon: '📊',
            text: `Reduce high-fat foods for better balance`
        });
    }
    
    if (recommendations.length === 0) {
        recommendations.push({
            type: 'success',
            icon: '✅',
            text: 'Excellent! Your plate has a well-balanced nutritional profile.'
        });
    }
    
    recommendationsDiv.innerHTML = `
        <div class="nutrition-summary">
            <div><strong>Total Weight:</strong> ${totalGrams}g</div>
            <div><strong>Nutrition:</strong> ${totals.calories.toFixed(0)} kcal | 
            P: ${totals.protein.toFixed(1)}g | 
            C: ${totals.carbs.toFixed(1)}g | 
            F: ${totals.fat.toFixed(1)}g | 
            Fiber: ${totals.fiber.toFixed(1)}g</div>
        </div>
        ${recommendations.map(rec => `
            <div class="recommendation ${rec.type}">
                <span style="margin-right: 8px;">${rec.icon}</span>
                ${rec.text}
            </div>
        `).join('')}
    `;
}

function updateProgressBar(progressId, current, valueId, currentPercent, target) {
    const progressBar = document.getElementById(progressId);
    const valueElement = document.getElementById(valueId);
    
    const progressPercentage = Math.min((currentPercent / target) * 100, 100);
    progressBar.style.width = progressPercentage + '%';
    valueElement.textContent = `${currentPercent}% / ${target}%`;
}

function updateNutrientProgress(nutrientName, current, target, progressId, valueId, recId) {
    const progressBar = document.getElementById(progressId);
    const valueElement = document.getElementById(valueId);
    const recElement = document.getElementById(recId);
    
    const progressPercentage = Math.min((current / target) * 100, 100);
    progressBar.style.width = progressPercentage + '%';
    valueElement.textContent = `${current}% / ${target}%`;
    
    // Individual nutrient recommendations
    let recommendation = '';
    let className = '';
    
    if (current === 0) {
        recommendation = `Add ${nutrientName} to your plate`;
        className = 'warning';
    } else if (current < target - 5) {
        const deficit = target - current;
        recommendation = `Add ${deficit}% more ${nutrientName}`;
        className = 'warning';
    } else if (current > target + 10) {
        const excess = current - target;
        recommendation = `Reduce ${nutrientName} by ${excess}%`;
        className = 'danger';
    } else if (current > target + 5) {
        recommendation = `Slightly high in ${nutrientName}`;
        className = 'warning';
    } else {
        recommendation = `Perfect ${nutrientName} level! ✓`;
        className = 'good';
    }
    
    recElement.textContent = recommendation;
    recElement.className = `progress-recommendation ${className}`;
}

function showWeightControlModal(ingredientId, ingredientName) {
    const currentCount = plateItems.filter(item => item.id === ingredientId).length;
    const currentWeight = currentCount * GRAMS_PER_SERVING;
    
    const newWeight = prompt(`Control weight for ${ingredientName}\nCurrent: ${currentWeight}g (${currentCount} servings)\nEnter new weight in grams (multiples of ${GRAMS_PER_SERVING}g):`, currentWeight);
    
    if (newWeight === null) return; // User cancelled
    
    const parsedWeight = parseInt(newWeight);
    if (isNaN(parsedWeight) || parsedWeight < 0) {
        alert('Please enter a valid weight (number greater than or equal to 0)');
        return;
    }
    
    const newCount = Math.round(parsedWeight / GRAMS_PER_SERVING);
    const difference = newCount - currentCount;
    
    if (difference > 0) {
        // Add more servings
        const ingredient = ingredients.find(ing => ing.id === ingredientId);
        for (let i = 0; i < difference; i++) {
            addToPlate(ingredient);
        }
    } else if (difference < 0) {
        // Remove servings
        for (let i = 0; i < Math.abs(difference); i++) {
            removeOneFromPlate(ingredientId);
        }
    }
    
    // Re-render everything
    renderPlate();
    renderConcurrentChart();
    updateRecommendations();
    if (isMobile) {
        renderIngredients();
    }
}

function deleteCustomIngredient(ingredientId) {
    // Confirm deletion
    const ingredient = ingredients.find(ing => ing.id === ingredientId);
    if (!ingredient) {
        alert('Ingredient not found!');
        return;
    }
    
    const confirmDelete = confirm(`Are you sure you want to delete "${ingredient.name}"? This action cannot be undone.`);
    if (!confirmDelete) {
        return;
    }
    
    // Remove from ingredients array
    ingredients = ingredients.filter(ing => ing.id !== ingredientId);
    
    // Remove from plate if present
    plateItems = plateItems.filter(item => item.id !== ingredientId);
    
    // Update storage
    saveIngredientsToStorage();
    
    // Re-render everything
    renderIngredients();
    renderPlate();
    renderConcurrentChart();
    updateRecommendations();
    
    // Show success message
    alert(`"${ingredient.name}" has been deleted successfully!`);
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (body.dataset.theme === 'light') {
        body.dataset.theme = 'dark';
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        body.dataset.theme = 'light';
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    body.dataset.theme = savedTheme;
    themeIcon.textContent = savedTheme === 'light' ? '☀️' : '🌙';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addIngredientModal');
    if (event.target === modal) {
        closeAddIngredientModal();
    }
}

// WebGL Wave Background
function initializeWaveBackground() {
    const canvas = document.getElementById('waveBackground');
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
        console.error('WebGL not supported');
        return;
    }

    const vertexShaderSource = `
        attribute vec4 a_position;
        void main() {
            gl_Position = a_position;
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        uniform vec2 iResolution;
        uniform float iTime;

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
            vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);

            for(float i = 1.0; i < 8.0; i++) {
                uv.y += i * 0.1 / i * 
                    sin(uv.x * i * i + iTime * 0.5) * sin(uv.y * i * i + iTime * 0.5);
            }

            vec3 col;
            col.r = uv.y - 0.1;
            col.g = uv.y + 0.3;
            col.b = uv.y + 0.95;

            fragColor = vec4(col, 1.0);
        }

        void main() {
            mainImage(gl_FragColor, gl_FragCoord.xy);
        }
    `;

    function compileShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const iTimeLocation = gl.getUniformLocation(program, 'iTime');

    let startTime = Date.now();

    function render() {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);

        const currentTime = (Date.now() - startTime) / 1000;

        gl.uniform2f(iResolutionLocation, width, height);
        gl.uniform1f(iTimeLocation, currentTime);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
    }

    render();
}

document.addEventListener('DOMContentLoaded', initializeApp);