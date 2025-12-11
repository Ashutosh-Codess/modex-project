"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowCard = ShowCard;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
function ShowCard(_a) {
    var show = _a.show;
    var showDate = new Date(show.startTime);
    var formattedDate = showDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
    var formattedTime = showDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
    var availabilityPercentage = (show.availableSeats / show.totalSeats) * 100;
    var isSoldOut = show.availableSeats === 0;
    // Use online movie poster images
    var posterUrls = [
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop',
    ];
    var posterUrl = posterUrls[show.id % posterUrls.length] || show.posterUrl;
    return (<div style={{
            background: 'rgba(139, 0, 0, 0.9)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            transition: 'all 0.3s',
            cursor: 'pointer',
            border: '2px solid rgba(255,255,255,0.1)'
        }} onMouseEnter={function (e) {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.5)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
        }} onMouseLeave={function (e) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        }}>
      <react_router_dom_1.Link to={"/booking/".concat(show.id)} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden' }}>
          <img src={posterUrl} alt={show.name} style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s'
        }} onError={function (e) {
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop';
        }} onMouseEnter={function (e) {
            e.currentTarget.style.transform = 'scale(1.1)';
        }} onMouseLeave={function (e) {
            e.currentTarget.style.transform = 'scale(1)';
        }}/>
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(139, 0, 0, 0.95)',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '600',
            border: '1px solid rgba(255,255,255,0.2)'
        }}>
            {show.genre}
          </div>
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 'bold',
            border: '1px solid rgba(255,255,255,0.2)'
        }}>
            ${show.price}
          </div>
        </div>

        <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }}>
            {show.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
            <lucide_react_1.Clock style={{ width: '16px', height: '16px' }}/>
            <span>{show.duration}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
            <lucide_react_1.Calendar style={{ width: '16px', height: '16px' }}/>
            <span>{formattedDate} {formattedTime}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
            <lucide_react_1.MapPin style={{ width: '16px', height: '16px' }}/>
            <span>{show.venue}</span>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Availability</span>
              <span style={{ fontWeight: '600', color: isSoldOut ? '#ff6b6b' : '#51cf66' }}>
                {isSoldOut ? 'Sold Out' : "".concat(show.availableSeats, " / ").concat(show.totalSeats)}
              </span>
            </div>
            <div style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '3px',
            overflow: 'hidden'
        }}>
              <div style={{
            width: "".concat(availabilityPercentage, "%"),
            height: '100%',
            background: isSoldOut ? '#ff6b6b' : '#51cf66',
            transition: 'width 0.3s'
        }}/>
            </div>
          </div>

          <button style={{
            width: '100%',
            padding: '0.75rem',
            background: isSoldOut ? '#555' : 'linear-gradient(135deg, #8b0000, #dc143c)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isSoldOut ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            boxShadow: isSoldOut ? 'none' : '0 4px 12px rgba(139,0,0,0.4)'
        }} disabled={isSoldOut} onMouseEnter={function (e) {
            if (!isSoldOut) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(139,0,0,0.5)';
            }
        }} onMouseLeave={function (e) {
            if (!isSoldOut) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,0,0,0.4)';
            }
        }}>
            {isSoldOut ? 'Sold Out' : 'Book Now'}
          </button>
        </div>
      </react_router_dom_1.Link>
    </div>);
}
